import { Component } from "@angular/core";
import { XviewSdk } from "@xiaheng/xviewsdk";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the MediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-media",
  templateUrl: "media.html"
})
export class MediaPage {

  videos = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MediaPage");
  }

  /**
   * 这个 array  array  array ！！！
   */
  images = [
    {
      imageIndex: "图片位置数",
      imagePath: "图片实际路径原生上传使用",
      imageType: "图片格式类型 比如 png  jpg",
      imagePrefix: "base64前缀 前端展示 需要拼接使用",
      imageBase64: "base64实际值  可以与imagePrefix 拼接使用 展示"
    }
  ]; // 返回结果

  pics = []; // 前端 展示使用 base64 图片

  files = []; // 使用原生 http 上传文件 固定参数 存放 文件路径

  uploadImage() {
    let photo = {
      maxNum: 9
    };

    XviewSdk.getInstance()
      .ComponentMedia.Photo(photo)
      .callNativeXView()
      .then(result => {
        if (result.code == 0) {
          this.images = result.data;
          for (let i = 0; i < this.images.length; i++) {
            this.pics.push(
              this.images[i].imagePrefix + this.images[i].imageBase64
            );
            this.files.push(this.images[i]["imagePath"]);
          }
        }
      });
  }

  // /**
  //  * 这个 array  array  array ！！！
  //  */
  //  images = [
  //    {imageIndex:"图片位置数",
  //    imagePath:"图片实际路径原生上传使用",
  //    imageType:"图片格式类型 比如 png  jpg",
  //    imagePrefix:"base64前缀 前端展示 需要拼接使用",
  //    imageBase64:"base64实际值  可以与imagePrefix 拼接使用 展示",}
  //   ];// 返回结果
  //  pics = [];// 前端 展示使用 base64 图片

  //  files = []// 使用原生 http 上传文件 固定参数 存放 文件路径

  takeImage() {
    XviewSdk.getInstance()
      .ComponentMedia.Camera(null)
      .callNativeXView()
      .then(result => {
        //下面代码 可以 放到自己方法中处理 这里 是示例 写在这里
        if (result.code == 0) {
          this.images = result.data;
          for (let i = 0; i < this.images.length; i++) {
            // base64 分前缀 和 实际值
            this.pics.push(
              this.images[i].imagePrefix + this.images[i].imageBase64
            );

            this.files.push(this.images[i]["imagePath"]);
          }
        }
      });
  }

  uploadVideo() {
    /**
     * 返回结果 用于前端 判断 时长展示 大小 控制 是否允许上传
     */
    let video = {
      imagePath: "图片实际路径原生上传使用",
      imageBase64: "直接展示使用 固定前缀（data:image/png;base64,）",
      videoPath: "图片格式类型 比如 png  jpg",
      videoDuration: "视频时长 单位 秒"
    };
    XviewSdk.getInstance()
      .ComponentMedia.Video()
      .callNativeXView()
      .then(result => {
        if (result.code == 0) {
          video.imageBase64 = result.data["imageBase64"];
          this.pics.push(video.imageBase64);
          //使用原生上传文件时 用到
          this.files.push(result.data["imagePath"]);
          this.files.push(result.data["videoPath"]);
          alert(
            "--imagePath" +
            result.data["imagePath"] +
            "--vedioPath" +
            result.data["videoPath"] +
            result.data["videoDuration"]
          );
        }
      });
  }

  uploadFile() {
    let url = "http://192.168.2.222/xiaxun/api/app";

    let data = {
      url: url + "/upload/",
      params: {
        test: "lliuyao",
      },
      files: this.files

    };
    XviewSdk.getInstance()
      .ComponentNet.FileUpload(data)
      .callNativeXView()
      .then(_result => {
        alert(JSON.stringify(_result));
      });
  }
}
