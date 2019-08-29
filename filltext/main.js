window.onload = function(){
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 1000,
        height = canvas.height = 1000;

    for(var i = 0; i < 100; i += 1){
        context.beginPath();
        context.moveTo(Math.random() * width, Math.random() * height);    
        context.lineTo(Math.random() * width, Math.random() * height);    
        context.stroke();
    }

    context.font = "48px serif";
    context.fillText("Hello world", 50, 100);

    // 空のimg要素を作る
    const img = new Image();

    img.onload = function() {
    // img要素の読み込みが終わったらこの中が処理される
    // 画像をHTMLに追加する
    document.body.appendChild(img);
    };

    // img要素 srcに画像化（base64化）したcanvasの内容を反映する
    img.src = canvas.toDataURL('image/jpeg');
    
};

