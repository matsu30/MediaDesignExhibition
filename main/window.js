var title = document.querySelector(".grid-title");
var body = document.querySelector(".comment-text");

var Img = document.getElementById('.HImg');


axios.post('/MediaDesignExhibition/api/getheart')
			.then(function (response) {
			// データの送信に成功したときの処理をここに書く
				console.log(response);
                console.log(response.data[0].title);
                console.log(response.data[0].body);
                console.log(response.data[0].img);
                var tit = title.innerHTML += response.data[0].title;
                var msg = body.innerHTML += response.data[0].body;
                var data = body.innerHTML += response.data[0].Img;
                Img.src = '/MediaDesignExhibition/api/postheart/' + data + '.jpeg';
                console.log(Img.src);
			})
			.catch(function (error) {
			// データの送信に失敗したときの処理をここに書く
				console.log(error);
            });