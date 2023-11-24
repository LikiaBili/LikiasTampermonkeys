// ==UserScript==
// @name         快速学习助手
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  用于为视频强制倍速播放以快速学习的场景，自动识别网页内的视频（不支持多个视频同时存在）
// @author       Likia
// @match        *
// @icon         
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var videoExist = false;

    const speedMenu = document.createElement('div');
    let onSwitch = 0;

    speedMenu.addEventListener('click', function() {
        if(videoExist == false){
            return;
        }
        const video = document.querySelector('video');
        if (onSwitch === 1) {
            speedMenu.style.backgroundColor = "rgb(70, 70, 200)";
            speedMenu.innerText = "速度x5";
            video.playbackRate = 5.0;
            onSwitch = 2;
        } else if (onSwitch === 2) {
            speedMenu.style.backgroundColor = "rgb(200, 70, 70)";
            speedMenu.innerText = "速度x10";
            video.playbackRate = 10.0;
            onSwitch = 3;
        } else if (onSwitch === 3) {
            speedMenu.style.backgroundColor = "rgb(100, 100, 100)";
            speedMenu.innerText = "速度x1";
            video.playbackRate = 1.0;
            onSwitch = 0;
        } else {
            speedMenu.style.backgroundColor = "rgb(70, 200, 70)";
            speedMenu.innerText = "速度x3";
            video.playbackRate = 3.0;
            onSwitch = 1;
        }
        replayButton.innerText = "倒退"+(onSwitch*15+10)+"秒";
    });


    const restartButton = document.createElement('div');
    restartButton.addEventListener('click',function(){
        if(videoExist){
            document.querySelector('video').currentTime = 0;
        }
    });

    const replayButton = document.createElement('div');
    replayButton.addEventListener('click',function(){
        var video = document.querySelector('video');
        if(videoExist && video.currentTime-onSwitch*10-10 > 0){
            video.currentTime = video.currentTime-onSwitch*10-10;
        }
    });

    var fullscreenState = false;
    const fullscreenButton = document.createElement('div');
    fullscreenButton.addEventListener('click',function(){
        if(videoExist){
            var video = document.querySelector('video');
            if(fullscreenState == true){
                fullscreenState = false;
            }else{
                fullscreenState = true;
            }
        }
    });


    setOff();
    document.body.appendChild(speedMenu);
    document.body.appendChild(restartButton);
    document.body.appendChild(replayButton);
    document.body.appendChild(fullscreenButton);
    // 每秒执行一次检测函数
    const interval = setInterval(function() {
        const videoElements = document.querySelector('video'); // 获取所有视频元素

        if (videoElements != null && videoExist == false) {
        // 页面中存在视频元素
            setOn();
        }else if(videoExist == true && videoElements == null){
            setOff();
        }
        if(videoExist == true){
            replayButton.innerText = "倒退"+(onSwitch*10+10)+"秒";
        }
    }, 1000); // 1000毫秒 = 1秒
    function setOff(){
        restartButton.setAttribute('style', "background-color: rgb(50, 50, 50); width: 40px; height: 40px; bottom: 10px; left: 150px; border-radius: 20px; color: white; cursor: pointer; text-align: center; padding: 5px; font-size: 30px; position: absolute;box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.7);transition: background-color 0.25s,border-radius 0.25s, left 0.25s, width 0.25s, height 0.25s;");
        speedMenu.setAttribute('style', "background-color: rgb(50, 50, 50); width: 130px; height: auto; bottom: 10px; left: 10px; border-radius: 10px; color: white; cursor: pointer; text-align: center; padding: 5px; font-size: 30px; position: absolute;box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.7);transition: background-color 0.25s,border-radius 0.25s, left 0.25s, width 0.25s, height 0.25s;");
        replayButton.setAttribute('style', "background-color: rgb(50, 50, 50); width: 40px; height: 40px; bottom: 10px; left: 200px; border-radius: 20px; color: white; cursor: pointer; text-align: center; padding: 5px; font-size: 30px; position: absolute;box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.7);transition: background-color 0.25s,border-radius 0.25s, left 0.25s, width 0.25s, height 0.25s;");
        onSwitch = 0;
        videoExist = false;
        fullscreenState = false;
        speedMenu.innerText = "无视频";
        restartButton.innerText = " ";
        replayButton.innerText = " ";
    }
    function setOn(){
        restartButton.setAttribute('style', "background-color: rgb(255, 50, 50); width: 140px; height: auto; bottom: 10px; left: 150px; border-radius: 20px; color: white; cursor: pointer; text-align: center; padding: 5px; font-size: 30px; position: absolute;box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.3);transition: background-color 0.25s,border-radius 0.25s, left 0.25s, width 0.25s, height 0.25s;");
        speedMenu.setAttribute('style', "background-color: rgb(100, 100, 100); width: 130px; height: auto; bottom: 10px; left: 10px; border-radius: 20px; color: white; cursor: pointer; text-align: center; padding: 5px; font-size: 30px; position: absolute;box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.3);transition: background-color 0.25s,border-radius 0.25s, left 0.25s, width 0.25s, height 0.25s;");
        replayButton.setAttribute('style', "background-color: rgb(200, 50, 50); width: 150px; height: auto; bottom: 10px; left: 300px; border-radius: 20px; color: white; cursor: pointer; text-align: center; padding: 5px; font-size: 30px; position: absolute;box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.3);transition: background-color 0.25s,border-radius 0.25s, left 0.25s, width 0.25s, height 0.25s;");
        speedMenu.innerText = "速度x1";
        restartButton.innerText = "从头开始";
        replayButton.innerText = "倒退0秒";
        videoExist = true;
    }
})();
