import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {
  // 用于保存验证码
  private code: string;
  // 存放验证码的过期时间
  private deadline: number;
  constructor() {
    this.code = '';
  }
  /**
   * 生成验证码，十分钟超时
   * @ param {number} count 数字验证码位数
   * @ return {*}  {string} 返回验证码
   * @ memberof AuthenticationCodeService
   */
  createCode(count: number): string {
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + 60 * 10 * 1000;
    for (let i = 0; i < count; i++) {
      this.code += Math.floor(Math.random() * 10);
    }
    return this.code;
  }
  /**
   * 验证用户输入的短信验证码是否一致，是否过期
   * @ param {string} value 用户输入的验证码
   * @ return {*}  {boolean} 返回验证结果
   * @ memberof AuthenticationCodeService
   */
  validate(value: string): boolean {
    const now = Date.now();
    return (value === this.code) && now < this.deadline;
  }
}
