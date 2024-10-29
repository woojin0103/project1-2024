# project1-2024
2024-2학기 캡스톤프로젝트 수업
openAPI를 사용한 인공지능 시스템 실습

# openweathermap

지정된 장소의 현재 날씨를 표시
[실습해보기](https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35)
```
$.ajax({
			type: "GET",
			url: 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35',
		}).done(function(response) {

			console.log(response)
			//alert(response.weather[0].main)

            let wdata = response
            let exdata = response.weather[0];
        
            temp.innerText = wdata.main.temp + "°C";
            min.innerText = wdata.main.temp_min;
            max.innerText = wdata.main.temp_max;
            wind.innerText = wdata.wind.speed;
        
            weather.innerText = exdata.main + "," + exdata.description;
            icon.setAttribute('src', icon_url + exdata.icon + ".png");
		}).fail(function(error) {
			alert("!/js/user.js에서 에러발생: " + error.statusText);
		});
```

# open AI

chatGPT를 활용하여 질문에 대한 답변을 표시
```
function talk(){
    squestion = txtMsg.value
    data ={
        model: smodelmini,
        messages: [
            {
                role: "user",
                content: squestion
            }
        ]
    }

    $.ajax({
        type:"POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers:{
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){
        console.log(response)
        txtOut.value = (response.choices[0].message.content)
    }).fail(function(error){
        console.log(error)
        errormsg=error.status + ":" + error.responseJOSN.error.code + " - " + message
        txtOut.value = errormsg
})
}
```
chatGPT를 활용하여 그림을 만듬
```
function draw(){
    squestion = txtMsg.value
    data ={
        prompt: squestion,
        n: 2,
        size: "512x512"
    }

    $.ajax({
        type:"POST",
        url: "https://api.openai.com/v1/images/generations",
        headers:{
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done( function(response){
        console.log(response)
        gimage.src = response.data[0].url
        gimage2.src = response.data[1].url
    }).fail(function(error){
        console.log(error)
        errormsg=error.status + ":" + error.responseJOSN.error.code + " - " + message
        txtOut.value = errormsg
})
}
```

# google cloud vision

google cloud vision을 활용하여 사람의 감정을 읽어내기
```
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
```

개발순서
1. 소스 수정
2. 소스 저장
3. 스테이징
4. 커밋 앤드 푸쉬
5. 커밋메세지


2024-9-19 깃허브 연동 실습
로컬에서 편집함


2024-10-22 얼굴인식 기능


사람의 얼굴을 인식해서 감정을 %로
나타내는 프로젝트 입니다.

사람이 여러명일경우 모든사람의 표정을 인식합니다.
