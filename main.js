// dragula([myTab])
dragula([main]);

var del = document.querySelectorAll('.delete');
var up = document.querySelector('.update');
var size = document.querySelector('.show>span')

del.forEach(item => {


  item.addEventListener('click', function (e) {
    // console.log(1);
    e.preventDefault();

    e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode)
  }, true)


})
var form = document.querySelector('form');
var hasRadius = document.querySelector('#hasRadius')
var noRadius = document.querySelector('#noRadius')
var controlBoard = document.querySelector('.controlBoard')

var reset = document.querySelector('#reset')
var cancel = document.querySelector('#cancel');

var lis = document.querySelectorAll('#main>li')
// 轮播图图片
var imgs = document.querySelectorAll('img');



// 代表针对文本类型需要显示的修改面板的内容
var textType = document.querySelector('.textType');
var imageType = document.querySelector('.imageType');

// 选取颜色
var colorInput = document.querySelector('#colorInput')

// var file1 = document.querySelector('file1')
// var file2 = document.querySelector('file2')
// var file3 = document.querySelector('file3')

var files = document.querySelectorAll('input[type="file"]')

// 修改图片的提交按钮
var submits = document.querySelectorAll('a[role="button"]')

// 修改文字的文本框
var textInput = document.querySelector('#textInput')
console.log(textInput);


files.forEach((item, index) => {

  item.onchange = function (e) {
    if (window.FileReader) {
      console.log('y');
    } else {
      console.log('n');
      alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
      return false;
    }
    //如果支持h5图片上传属性则往下走
    var file = e.target.files[0];
    console.log(e.target);
    console.log(file);
    //判断获取的是否为图片文件  
    if (!/image\/\w+/.test(file.type)) {
      alert("请确保文件为图像文件");
      return false;
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        //获取图片dom
        // var img = document.getElementById("preview");
        //图片路径设置为读取的图片
        imgs[index].src = e.target.result;
      }
    }

  }
})


// console.log(files);


// console.log(imgs);

// 得到不同li内容的类型
// console.log(lis[1].dataset.type);

var liSign = -1;
var typeSign;

hasRadius.onclick = function () {
  reset.disabled = false;
}
noRadius.onclick = function () {
  reset.disabled = false;
}


lis.forEach((item, index) => {
  item.onclick = function () {
    // console.log(item.innerText);
    // console.log(item.textContent.slice(0, item.textContent.length - 2));

    textInput.value = item.textContent.slice(0, item.textContent.length - 2);

    // console.log($("#textInput").val)
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.borderColor = "wheat"
    }
    item.style.borderColor = 'blue'
    liSign = index;
    // reset.disabled = true;
    controlBoard.style.visibility = 'visible'
    switch (item.dataset.type) {
      case 'carousel':
        reset.disabled = false;
        typeSign = 'carousel'
        textType.style.display = 'none'
        imageType.style.display = "block"
        break;
      case 'text':

        typeSign = 'text'
        imageType.style.display = "none"
        textType.style.display = 'block'
        break;

      default:
        break;
    }
  }
})
// textInput.onclick = function () {
// }


reset.onclick = function () {
  lis[liSign].style.backgroundColor = colorInput.value;

  lis[liSign].children[0].innerText = textInput.value;

  if (typeSign == 'text') {
    if (liSign == -1) {
      return
    }
    if (hasRadius.checked) {
      lis[liSign].style.borderRadius = "12px";

    }
    if (noRadius.checked) {
      lis[liSign].style.borderRadius = "";
    }
    setTimeout(() => {
      controlBoard.style.visibility = 'hidden'
      textType.style.display = 'none'
      imageType.style.display = 'none'

      lis[liSign].style.borderColor = "wheat"


      noRadius.checked = false;
      hasRadius.checked = false;
    }, 500);


  }
  if (typeSign == 'carousel') {
   // console.log(123);

    files.forEach((item, index) => {
      //console.log(1);

      item.addEventListener('change', function (e) {
        //判断是否支持FileReader
        console.log('come in');
        if (window.FileReader) {
          console.log('y');
        } else {
          console.log('n');
          alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
          return false;
        }
        //如果支持h5图片上传属性则往下走
        var file = e.target.files[0];
        console.log(file);

        // var file = item;
        console.log(file);

        //判断获取的是否为图片文件  
        if (!/image\/\w+/.test(file.type)) {
          alert("请确保文件为图像文件");
          return false;
        }
      })
    })

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      //获取图片dom
      // var img = document.getElementById("preview");
      //图片路径设置为读取的图片
      // img.src = e.target.result;
      imgs[index].src = e.target.result;
    }



  }
  cancel.onclick = function () {
    controlBoard.style.visibility = 'hidden'
    textType.style.display = 'none'
    imageType.style.display = 'none'
    lis[liSign].style.borderColor = "wheat"

    noRadius.checked = false;
    hasRadius.checked = false;

  }


}

// console.log(hasRadius.checked);


// size.textContent += del[del.length - 1].style.border;