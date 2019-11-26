var title = document.querySelector(".grid-title");
var body = document.querySelector(".comment-text");
var Img = document.getElementById("img");

let limit = 80;
let offset = 0;

axios.post(`/api/getheart?limit=${limit}&offset=${offset}`)
			.then(function (response) {
			// データの送信に成功したときの処理をここに書く
				console.log(response);
                console.log(response.data[0].title);
                console.log(response.data[0].body);
                console.log(response.data[0].img);
                var tit = title.innerHTML += response.data[0].title;
                var msg = body.innerHTML += response.data[0].body;
                Img.innerHTML = `
                <div>
                    <img src="/api/postheart/images/${response.data[0].img}.jpeg" width="300px">
                </div>
                `;
            
			})
			.catch(function (error) {
			// データの送信に失敗したときの処理をここに書く
				console.log(error);
            });