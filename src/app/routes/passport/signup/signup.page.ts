import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AuthenticationCodeService } from './../shared/authentication-code.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { Signup } from '../signup';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { PassportService } from '../shared/passport.service';
import { Login } from './../login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;
  slideIndex = 0;
  successCode = true;
  timeron = false;
  codecount = 0;
  realcode = '';
  buttonText = '获取验证码';
  signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: '',
    anotherName: '',
    shopKeeperName: '',
    shopTel: '',
    createDate: '',
  };
  CurrentLoginedUser: Login = {
    identifier: '',
    passwordToken: '',
    shopName: '',
    phone: '',
    loginDate: ''
  };
  // tslint:disable-next-line: max-line-length
  constructor(private localStorageService: LocalStorageService, private authenticationCodeService: AuthenticationCodeService, private router: Router, private passportService: PassportService) { }

  /**
   * 初始化函数
   * @ memberof SignupPage
   */
  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true);
  }
  //  下一步

  /**
   * 进入下一个slide
   * @ param {Event} event 事件
   * @ memberof SignupPage
   */
  onNext(event: Event) {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext();
    this.slideIndex++;
    this.signupSlides.lockSwipeToNext(true);
  }
  /**
   * 进入上一个slide
   * @ param {Event} event 事件
   * @ memberof SignupPage
   */
  onPrevious(event: Event) {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slidePrev();
    this.slideIndex--;
    this.signupSlides.lockSwipeToNext(true);
  }
  /**
   * 发送验证码，启动计时器
   * @ param {Event} event 事件
   * @ memberof SignupPage
   */
  onSendSMS(event: Event) {
    this.realcode = '验证码：' + this.authenticationCodeService.createCode(4);
    this.timer();
  }
  /**
   * 验证验证码
   * @ param {string} value 用户输入的验证码
   * @ memberof SignupPage
   */
  onValidateCode(value: string) {
    if (this.authenticationCodeService.validate(value)) {
      this.successCode = true;
      this.signupSlides.lockSwipeToNext(false);
      this.signupSlides.slideNext();
      this.slideIndex++;
      this.signupSlides.lockSwipeToNext(true);
    }
    else {
      this.successCode = false;
    }
  }
  /**
   * 点击验证码框消除错误提示
   * @ param {Event} event 事件
   * @ memberof SignupPage
   */
  onCodeBox(event: Event) {
    this.successCode = true;
  }
  /**
   * 注册步骤图片判断
   * @ param {number} index slide索引号
   * @ return {*}  {boolean} 布尔值
   * @ memberof SignupPage
   */
  isActive(index: number): boolean {
    return this.slideIndex === index;
  }
  // 倒计时器

  /**
   * 倒计时器，60秒后重新获取验证码
   * @ memberof SignupPage
   */
  timer() {
    this.timeron = true;
    const intervalSubscription = interval(1000).pipe(take(60)).subscribe((num) => {
      this.buttonText = 59 - num + '秒后重新获取';
    },
      (error) => { console.log(error); },
      () => {
        this.timeron = false;
        if (this.codecount === 2) { this.timeron = true; }
        this.buttonText = '获取验证码';
        this.codecount++;
        console.log('complete');
        intervalSubscription.unsubscribe();
      });
  }
  onSignupPhone(form: NgForm) {
    // 已通过客户端验证
    if (form.valid) {
      if (this.passportService.checkPhoneNumber(this.signup.phone)) {
        console.log('注册成功');
        const temp = this.localStorageService.get('SignupedUsers', []);
        // tslint:disable-next-line: max-line-length
        this.signup.createDate =  new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
        const obj = {
          phone: this.signup.phone,
          email: this.signup.email,
          password: this.signup.password,
          shopName: this.signup.shopName,
          anotherName: this.signup.anotherName,
          shopKeeperName: this.signup.shopKeeperName,
          shopTel: this.signup.shopTel,
          createDate: this.signup.createDate
        };
        temp.push(obj);
        this.localStorageService.set('SignupedUsers', temp);
        this.signupSlides.lockSwipeToNext(false);
        this.signupSlides.slideNext();
        this.slideIndex++;
        this.signupSlides.lockSwipeToNext(true);
      }
      else {
        console.log('号码被注册');
      }
    }
  }
  toTabs(event: Event){
    this.CurrentLoginedUser.identifier = this.signup.phone;
    this.CurrentLoginedUser.passwordToken = this.signup.password;
    this.CurrentLoginedUser.phone = this.signup.phone;
    this.CurrentLoginedUser.shopName = this.signup.shopName;
    const time = new Date();
    this.CurrentLoginedUser.loginDate = time.toLocaleString();
    this.localStorageService.set('CurrentLoginedUser', this.CurrentLoginedUser);
    const appConfig = this.localStorageService.get('App');
    appConfig.login = true;
    this.localStorageService.set('App', appConfig);
    this.router.navigateByUrl('tabs');
  }
}
