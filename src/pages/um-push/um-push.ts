import { Component } from "@angular/core";
import { XviewSdk } from "@xiaheng/xviewsdk";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the UmPushPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-um-push",
  templateUrl: "um-push.html"
})
export class UmPushPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

/**
 * 如果使用一个回调方法 用pushType 区分  0 为收到消息 未点击  1 为收到通知并点击
 */
  ionViewDidLoad() {
    console.log("ionViewDidLoad UmPushPage");

    let notificationClick = (_result)=>{
      alert(_result.data.pushData["pushParams"]);
    }
    XviewSdk.getInstance()
    .ComponentPush
    .NotificationClick(notificationClick);

    XviewSdk.getInstance()
    .ComponentPush
    .Notification(notificationClick);
  }
  /**
   * 设置别名
   * 参数   :{
   *        type:""    别名类型     (必填)
   *       alias:""    别名名称     (必填)
   *          }
   *  return:code:0/-1
   * message:设置成功/设置失败
   * data:json
   */
  setAlias() {
    let alias = {
      alias: "liuyao",
      aliasType: "ly"
    };
    XviewSdk.getInstance()
      .ComponentPush.SetAlias(alias)
      .callNativeXView()
      .then(_result => {
        alert(JSON.stringify(_result));
      });
  }

  /**
   * 删除别名
    同设置别名
   */
  deleteAlias() {
    let alias = {
      alias: "liuyao",
      aliasType: "liuyao"
    };
    XviewSdk.getInstance()
      .ComponentPush.DeleteAlias(alias)
      .callNativeXView()
      .then(_result => {
        alert(JSON.stringify(_result));
      });
  }

  /**
   * 添加标签
   * 组件名 :ComponentPush
   * action:AddTags
   * 参数   :{
   *        tags:[]    标签数组
   *          }
   * return:code:0/-1
   *     message:设置成功/设置失败
   *        data:json
   */
  addTags() {
    let tag = { tags: ["1234", "12345", "123456"] };
    XviewSdk.getInstance()
      .ComponentPush.AddTag(tag)
      .callNativeXView()
      .then(_result => {
        alert(JSON.stringify(_result));
      });
  }

  /**
   * 删除几个标签
 同添加标签
   */
  deleteTags() {
    let tag = { tags: ["1234", "12345"] };
    XviewSdk.getInstance()
      .ComponentPush.DeleteTag(tag)
      .callNativeXView()
      .then(_result => {
        alert(JSON.stringify(_result));
      });
  }

  /**
   * 获取所有标签
   * 组件名 :ComponentPush
   * action:GetAllTags
   * 参数   :无
   * return:code:0/-1
   *     message:获取成功/获取失败
   *        data:[]             标签数组
   */
  getAllTags() {
    XviewSdk.getInstance()
      .ComponentPush.GetTags()
      .callNativeXView()
      .then(_result => {
        alert(JSON.stringify(_result));
      });
  }
}
