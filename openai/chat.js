let qus = document.querySelector('#qus');
OPENAPI_KEY = ""

smodel = "gpt-3.5-turbo"
smodelmini = "gpt-4o-mini"
squestion = "황진이가 누구야"
function talk(){
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
        alert(response.choices[0].message.content)
    }).fail(

    )
}

talk()