GOOGLEAPI_KEY = 

function processFile(event){
    content = event.target.result 
    imagestring = content.replace('data:image/jpeg;base64,', '')
    document.getElementById("gimage").src = content
}

function uploadFiles(files){
    file = files[0]
    reader = new FileReader()
    reader.onloadend = processFile
    reader.readAsDataURL(file)
}

function getLikelihoodValue(likelihood) {
    switch (likelihood) {
        case "VERY_LIKELY":
            return "100%";
        case "LIKELY":
            return "75%";
        case "POSSIBLE":
            return "50%";
        case "UNLIKELY":
            return "25%";
        case "VERY_UNLIKELY":
            return "0%";
        default:
            return "UNKNOWN";
    }
}


function analyze(){
    data = {
        requests: [{
            image: {
                content: imagestring
            },
            features: [{
                type: "FACE_DETECTION",
                maxResults: 100
            }]
        }]
    }

    $.ajax({
        type: "POST",
        url: 'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLEAPI_KEY,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function(response) {
        console.log(response);
        if (response.responses[0].faceAnnotations) {
            const faces = response.responses[0].faceAnnotations;
            let resultText = '';

            faces.forEach((faceData, index) => {
                const joy = getLikelihoodValue(faceData.joyLikelihood);
                const sorrow = getLikelihoodValue(faceData.sorrowLikelihood);
                const anger = getLikelihoodValue(faceData.angerLikelihood);
                const surprise = getLikelihoodValue(faceData.surpriseLikelihood);

                resultText += `사람 ${index + 1}:\n` +
                              '기쁨: ' + joy + '\n' +
                              '슬픔: ' + sorrow + '\n' +
                              '분노: ' + anger + '\n' +
                              '놀람: ' + surprise + '\n\n';
            });

            document.getElementById("result").value = resultText.trim();
        } else {
            document.getElementById("result").value = "얼굴 감지 결과가 없습니다.";
        }
    }).fail(function(error) {
        console.log(error);
    });
}
