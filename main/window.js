var title = document.querySelector(".grid-title");
var body = document.querySelector(".comment-text");

axios.post('/MediaDesignExhibition/api/getheart')
			.then(function (response) {
			// データの送信に成功したときの処理をここに書く
				console.log(response);
                console.log(response.data[0].title);
                console.log(response.data[0].body);
                var tit = title.innerHTML += response.data[0].title;
                var msg = body.innerHTML += response.data[0].body;
                log(tit);
                log(msg);
			})
			.catch(function (error) {
			// データの送信に失敗したときの処理をここに書く
				console.log(error);
            });