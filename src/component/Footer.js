import React from 'react';
import { Link } from 'react-router-dom';
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-6 mb-3">
                            <h2>درباره سایت دومینو تایم</h2>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                        </div>
                        <div class="col-md-3 col-6 mb-3">
                            <h2>اطلاعات</h2>
                            <ul>
                                <li><a href=""><i class="fas fa-caret-left"></i>پاسخ به پرسش های متداول</a></li>
                                <li><a href=""><i class="fas fa-caret-left"></i>شرایط استفاده</a></li>
                                <li><a href=""><i class="fas fa-caret-left"></i>رویه های پرداخت</a></li>
                                <li><a href=""><i class="fas fa-caret-left"></i>حریم خصوصی</a></li>
                            </ul>
                        </div>
                        <div class="col-md-3 col-6 mb-3">
                            <h2>تورنومنت ها</h2>
                            <ul>
                                <li><a href=""><i class="fas fa-caret-left"></i>تورنومنت اول</a></li>
                                <li><a href=""><i class="fas fa-caret-left"></i>تورنومنت دوم</a></li>
                                <li><a href=""><i class="fas fa-caret-left"></i>تورنومنت سوم</a></li>
                                <li><a href=""><i class="fas fa-caret-left"></i>تورنومنت چهارم</a></li>
                            </ul>
                        </div>
                        <div class="col-md-3 col-6 mb-3">
                            <h2>ارتباط با ما</h2>
                            <div>
                                <a href=""><i class="fab fa-telegram-plane pl-1 pr-0"></i></a>
                                <a href=""><i class="fab fa-instagram pl-1 pr-0"></i></a>
                                <i class="fas fa-angle-double-left pl-2 pr-0"></i>
                                @dominotime.ir
                </div>
                            <div class="my-2">آدرس ایمیل : info@dominotime.net</div>
                        </div>
                        <div class="col-12 text-center">کلیه حقوق برای سایت دومینو تایم محفوظ می باشد.</div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;