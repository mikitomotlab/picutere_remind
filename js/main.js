/*const imgA = document.querySelector('#myImageA');
imgA.onload = () => {
  imgA.classList.remove('loading');
};
imgA.src = 'img/';
imgA.classList.add('loading')

window.onload=getExif;

function getExif(){
  var img1 = document.getElementById("img1")
  EXIF.getData(img1, function(){
    var make = EXIF.getTag(this, "Make");
    var model = EXIF.getTag(this, "Model");
    var makeAndModel = document.getElementById("makeAndmodel");
    makeAndModel.innerHTML = '${make} ${model}';
  })
}*/
var ExifMaster;

var filename;

// キャンバス
var src_canvas, dst_canvas;
var src_ctx, dst_ctx;

// イメージ
var image;

window.onload = function(){

  src_canvas = document.getElementById("SrcCanvas");
  src_ctx = src_canvas.getContext("2d");

  dst_canvas = document.getElementById("DstCanvas");
  dst_ctx = dst_canvas.getContext("2d");

  image = document.getElementById("img_source");

  src_canvas.width  = image.width;
  src_canvas.height = image.height;
  src_ctx.drawImage(image,0,0);

  document.getElementById("btn_start").style.backgroundColor ="#ccc";
  document.getElementById("btn_start").disabled = true;
}

function onDragOver(event){
  event.preventDefault();
}

function onDrop(event){
  onAddFile(event);
  event.preventDefault();
}

function run() {

  if(!ExifMaster) return false;

  try{
    ExifMaster.SaveToFile(filename, !document.form1.chk_orientation.checked);
  }catch(e){
    alert(e);
  }

  return false;
}

function register(event){
  const obj = {
    "latitude": ExifMaster.Analyst.IFD.gps[0].data,
    "logitude": ExifMaster.Analyst.IFD.gps[1].data,
    "time" : ExifMaster.Analyst.IFD.camera[4].data,
  };
  const data = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    /*body: JSON.stringify(
        "latitude": ExifMaster.Analyst.IFD.gps[0].data,
        "logitude": ExifMaster.Analyst.IFD.gps[1].data,
        "time" : ExifMaster.Analyst.IFD.camera[4].data,
      )*/
    body: JSON.stringify(obj)

  };

    fetch('http://localhost/phpmyadmin/sql.php?server=1&db=picture_data&table=data&pos=0', data)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(e => {
        console.error(e);
      });
  }



function onAddFile(event) {
  var files;
  var reader = new FileReader();

  if(event.target.files){
    files = event.target.files;
  }else{
    files = event.dataTransfer.files;
  }

  // ***********************
  //  ArrayBuffer
  //  ※ファイルの読み込み
  // ***********************
  reader.onload = function (event) {

    try{

      ExifMaster = new TExifMaster(new Uint8Array(reader.result));

      // プロパティ確認用
      console.log(ExifMaster.Analyst);

      var html = "<p>"+ filename +" ("   + ExifMaster.Analyst.Width +
                 "x" + ExifMaster.Analyst.Height +")</p>";

      if(ExifMaster.Analyst.IFD.main.length == 0){
        html += '<p style="color:red;font-weight:bold;">このファイルには「Exif情報」はありません。</p>';

        document.getElementById("btn_start").style.backgroundColor  ="#ccc";
        document.getElementById("btn_start").disabled = true;
      }else{

        // -----------------
        //  メイン
        // -----------------
        html += "<h3>メイン</h3>";
        html += "<p></p>";
        html += "<table>";
        for(var i=0;i<ExifMaster.Analyst.IFD.main.length;i++){
          html += "<tr>";
            html += "<th>" + ExifMaster.Analyst.IFD.main[i].key  + "</th>";
            html += "<td>" + ExifMaster.Analyst.IFD.main[i].data + "</td>";
          html += "</tr>";
        }
        html += "</table>";
        html += "<p></p>";

        // -----------------
        //  GPS
        // -----------------
        html += "<h3>GPS</h3>";
        if(ExifMaster.Analyst.IFD.gps.length != 0){

          if(ExifMaster.Analyst.DMS){
           // Googleマップ用のURLの生成
           var dms = ExifMaster.Analyst.DMS.replace('"','%22');
           dms = dms.replace('"','%22');
           dms = dms.replace('°','%C2%B0');
           dms = dms.replace('°','%C2%B0');
           html +='<p><a href="https://www.google.co.jp/maps/place/' + dms  + '">Googleマップでこの座標の位置を確認する。</a></p>';
          }else{
            html += "<p></p>";
          }

          html += "<table>";
          for(var i=0;i<ExifMaster.Analyst.IFD.gps.length;i++){
            html += "<tr>";
              html += "<th>" + ExifMaster.Analyst.IFD.gps[i].key  + "</th>";
              html += "<td>" + ExifMaster.Analyst.IFD.gps[i].data + "</td>";
            html += "</tr>";
          }
          html += "</table>";
          html += "<p>※UTC(協定世界時)に+9時間すると日本標準時となります。</p>";
        }else{
          html += "<p>GPS情報はありません。</p>";
        }

        // -----------------
        //  カメラ
        // -----------------
        html += "<h3>カメラ</h3>";
        if(ExifMaster.Analyst.IFD.camera.length != 0){
          html += "<p></p>";
          html += "<table>";
          for(var i=0;i<ExifMaster.Analyst.IFD.camera.length;i++){
            html += "<tr>";
              html += "<th>" + ExifMaster.Analyst.IFD.camera[i].key  + "</th>";
              html += "<td>" + ExifMaster.Analyst.IFD.camera[i].data + "</td>";
            html += "</tr>";
          }
          html += "</table>";
        }else{
          html += "<p>カメラ情報はありません。</p>";
        }

        document.getElementById("btn_start").style.backgroundColor  = "#ff6347";
        document.getElementById("btn_start").disabled = false;
      }
    }catch(e){
      alert(e);
      document.getElementById("btn_start").style.backgroundColor ="#ccc";
      document.getElementById("btn_start").disabled = true;
      document.getElementById("result").innerHTML = "";

      image.onload =function(e){
        src_canvas.width  = image.width;
        src_canvas.height = image.height;
        src_ctx.drawImage(image,0,0);
      }
      image.src = "dropbox.png";
      return;
    }

    // ***********************
    //  Base64
    //  ※リサイズ/回転/反転
    // ***********************
    var base64 = new FileReader();
    base64.onload = function (event) {
      image.onload = function (){

        // 回転/反転なし
        var Orientation = ExifMaster.Analyst.Orientation;
        if (!Orientation){
          Orientation = 1;
        }

        // -----------------
        //  リサイズ
        // -----------------
        var size = 280;
        if(image.width > image.height){
          // 幅を基準にアスペクト比を調整する
          var aspect_ratio = image.width / size;
          var another = Math.round(image.height / aspect_ratio);

          src_canvas.width  = size;
          src_canvas.height = another;
        }else{
          // 高さを基準にアスペクト比を調整する
          var aspect_ratio = image.height / size;
          var another = Math.round(image.width / aspect_ratio);

          src_canvas.width  = another;
          src_canvas.height = size;
        }
        src_ctx.drawImage(image,0,0,src_canvas.width,src_canvas.height);

        // -----------------
        //  生データの取得
        // -----------------
        var src, dst;
        switch (Orientation){
          // サイズ変更なし
          case 2:;case 3:;case 4:
            dst_canvas.width  = src_canvas.width;
            dst_canvas.height = src_canvas.height;
            break;

          // サイズ変更あり
          case 5:;case 6:;case 7:;case 8:
            dst_canvas.width  = src_canvas.height;
            dst_canvas.height = src_canvas.width;
        }
        src = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
        dst = dst_ctx.getImageData(0, 0, dst_canvas.width, dst_canvas.height);

        // -----------------
        //  エフェクト
        // -----------------
        switch (Orientation){
          // [状態]左右反転
          case 2: EffectMirror(src, dst);break;
          // [状態]180度回転
          case 3: EffectTrun(src, dst, 3);break;
          // [状態]上下反転
          case 4: EffectFlip(src, dst);break;

          // [状態]右90度回転 + 左右反転
          case 5:
                  // 左90度
                  EffectTrun(src, dst ,1);
                  src_canvas.width  = dst_canvas.width;
                  src_canvas.height = dst_canvas.height;
                  src_ctx.putImageData(dst,0,0);

                  // 左右反転
                  src = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
                  dst = dst_ctx.getImageData(0, 0, dst_canvas.width, dst_canvas.height);
                  EffectMirror(src, dst);
                  break;

          // [状態]左90度回転
          case 6: EffectTrun(src, dst ,2);break;

          // [状態]左90度回転 + 左右反転
          case 7:
                  // 右90度
                  EffectTrun(src, dst ,2);
                  src_canvas.width  = dst_canvas.width;
                  src_canvas.height = dst_canvas.height;
                  src_ctx.putImageData(dst,0,0);

                  // 左右反転
                  src = src_ctx.getImageData(0, 0, src_canvas.width, src_canvas.height);
                  dst = dst_ctx.getImageData(0, 0, dst_canvas.width, dst_canvas.height);
                  EffectMirror(src, dst);
                  break;

          // [状態]右90度回転
          case 8: EffectTrun(src, dst ,1);break;
        }

        if(Orientation != 1){
          src_canvas.width  = dst_canvas.width;
          src_canvas.height = dst_canvas.height;
          src_ctx.putImageData(dst,0,0);
        }
      }
      image.src = base64.result;
    }

    base64.readAsDataURL(new Blob([reader.result],{type:"image/jpeg"}));
    document.getElementById("result").innerHTML = html;
  };

  if (files[0]){
    filename = files[0].name;
    reader.readAsArrayBuffer(files[0]);
    document.getElementById("inputfile").value = "";
  }
}
/*
$pic_data = array(
  'latitude' =>
  'longitude' =>
  'time' =>
);
*/
