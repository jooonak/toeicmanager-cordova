/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructora
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        FCMPlugin.getToken(
            function(token){
                console.log("token :"+ token);

                if (localStorage.member) {
                    console.log("멤버 있음");
                    var member = JSON.parse(localStorage.member);
                    if (member.pushToken === token) {
                        console.log("같은 토큰");
                    } else {
                        console.log("다른 토큰");
                        member.pushToken = token;
                        localStorage.member = JSON.stringify(member);

                        // ajax -> DB의 member.pushToken값 변경
                        var data = {mid : member.mid, pushToken : member.pushToken};

                        var xhr = new XMLHttpRequest();
                        xhr.open("PUT", 'http://192.168.0.24:8080/login/token', true);
                        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                        xhr.onload = function (member) {
                            if (xhr.readyState == 4 && xhr.status == "200") {
                                console.table(member);
                            } else {
                                console.error(member);
                            }
                        }
                        xhr.send(JSON.stringify(data));
                    }
                } else {
                    localStorage.token = token;
                    //회원가입 할 때 업데이트
                    console.log("로그인 해");
                }

            },
            function(err){
                console.log('error retrieving token: ' + err);
            }
        );
        FCMPlugin.onNotification(
            function(data){
                if(data.wasTapped){
                    console.log( JSON.stringify(data) );
                    console.log('아아아');
                }else{
                    console.log( JSON.stringify(data) );
                    console.log('오오오');
                }
            },
            function(msg){
                console.log('onNotification callback successfully registered: ' + msg);
            },
            function(err){
                console.log('Error registering onNotification callback: ' + err);
            }
        );

        FCMPlugin.onTokenRefresh(function(token){
            alert( token );
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();