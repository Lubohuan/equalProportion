//屏幕自适应方法
(function() {
    var timeTicket;

    var width = 1920;
    var height = 1080;

    var isIE = (function () {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE]><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    })();

    var transform = function () {
        var ratio = window.innerHeight / window.innerWidth;
        var rate = 1;
        if (ratio >= height / width) {
            rate = window.innerWidth / width;
        } else {
            rate = window.innerHeight / height;
        }
        var body = document.body;
        var container = document.querySelector('#container');
        var paddingLeft = parseInt(body.clientWidth - width * rate) / 2;

        if (isIE) {
            var frameStyle = container.getAttribute('style');
            container.setAttribute(
              'style',
              frameStyle
              + '-ms-transform: scale(' + rate + ',' + rate + ');' + 
              + 'left: ' + paddingLeft + 'px'
            );
        } else {
            container.style.transform = 'scale(' + rate + ')';
            container.style.left = paddingLeft + 'px';
        }

        if($(".elastic_layer").length > 0){
            var elastic_layer = document.querySelector('.elastic_layer');
            elastic_layer.style.transform = 'scale(' + rate + ')';
        }
    };

    function autoScale() {
        clearTimeout(timeTicket);
        timeTicket = setTimeout(transform, 100);
    }

    transform();
    window.addEventListener('resize', autoScale);
})();

(function() {
    if($('#test').length > 0){
        function get(id){
            return document.getElementById(id);
        }

        var mouseOffsetX = 0;
        var mouseOffsetY = 0;
        var isDraging = false;

        get('test_head').addEventListener('mousedown', function(e){
            var e = e||window.event;
            mouseOffsetX = e.pageX - get('test').offsetLeft;
            mouseOffsetY = e.pageY - get('test').offsetTop;
            isDraging = true;
            console.log(isDraging);
        });

        document.onmousemove = function(e){
            var e = e||window.event;
            var moveX = 0;
            var moveY = 0;

            if( isDraging === true){
                moveX = e.pageX - mouseOffsetX;
                moveY = e.pageY - mouseOffsetY;

                get('test').style.left = moveX + "px";
                get('test').style.top = moveY + "px";
            }
        }

        document.onmouseup = function(){
            isDraging = false;
        }
    }
})();

//项目选择
(function() {
    
})();

//时间方法
(function () {
    var day_container = $('#clock_day');
    var time_container = $('#clock_time');
    var interval = 500;
    if (container.length == 0) {
        return;
    }
    setTimeout(function () {
        var d = new Date(),
            y = d.getFullYear(),
            m = d.getMonth(),
            da = d.getDate(),
            h = d.getHours(),
            i = d.getMinutes(),
            s = d.getSeconds(),
            w = d.getDay(), html;

        day_html = y + ' - ' + fix(m+1) + ' - ' + fix(da); 
        time_html = fix(h) + ' : ' + fix(i) + ' : ' + fix(s);
        day_container.html(day_html);
        time_container.html(time_html);
        setTimeout(arguments.callee, interval);
    }, interval);

    function fix(i) {
        if (i < 10) {
            return '0' + i;
        }
        return i;
    }

    function toWeek(week) {
        switch (week) { 
            case 1: 
                str = "一"; 
                break; 
            case 2: 
                str = "二"; 
                break; 
            case 3: 
                str = "三"; 
                break; 
            case 4: 
                str = "四"; 
                break; 
            case 5: 
                str = "五"; 
                break; 
            case 6: 
                str = "六"; 
                break;
            case 0: 
            default:
                str = "日"; 
                break; 
        }
        return str; 
    }
})();

//首页处理(项目)
(function () {
    var postData = JSON.parse(postDataSource);

    //项目信息
    function update_project_info(){
        $.post(postData['project_info']['url'],postData['project_info']['params'],function(ret){
            if(ret['code'] == 0){
                $('#project_size .module_value span:first').html(ret['data']['OrgProjectInfo']['project_size_num']);
                $('#project_size .module_value span:last').html(ret['data']['OrgProjectInfo']['project_size_unit']);
                $('#contract_time .module_value span:first').html(ret['data']['OrgProjectInfo']['contract_time']);
                $('#project_status .module_value').html(ret['data']['OrgProjectInfo']['project_status']);
                $('#project_type .module_value').html(ret['data']['OrgProjectInfo']['project_type']);
            }
        });
    }

    //项目概况--质量模块
    function update_quality_problem_check_type_bar_chart(){
        $.post(postData['quality_problem_check']['url'],postData['quality_problem_check']['params'],function(ret){
            if(ret['code'] == 0){
                horizontal_bar_chart('quality_problem_check_bar_chart', ret['data']);
            }
        });
        // var data = {
        //     'yAxis_data' : ['桩基及地下连续墙','土方开挖及支撑','主体混凝土工程1', '主体混凝土工程2', 
        //     '主体混凝土工程3', '主体混凝土工程4', '主体混凝土工程5','主体混凝土工程6','主体混凝土工程7',
        //     '主体混凝土工程8',],
        //     'series_base_data' : [17, 17, 17, 17, 17, 17, 17, 17, 17, 17],
        //     'series_data' : [15, 17, 6, 5, 12, 1, 4, 6, 14, 17],
        // };
        // var data = {
        //     'yAxis_data' : ['桩基及地下连续墙','土方开挖及支撑','主体混凝土工程1', '主体混凝土工程2'],
        //     'series_base_data' : [17, 17, 17, 17],
        //     'series_data' : [15, 17, 6, 5],
        // };
        // horizontal_bar_chart('quality_problem_check_bar_chart', data);
    }

    //项目概况--安全模块
    function update_safe_patrol_danger_line_chart(){
        $.post(postData['safe_check_group_time']['url'],postData['safe_check_group_time']['params'],function(ret){
            if(ret['code'] == 0){
                line_chart('safe_patrol_danger_line_chart',ret['data']);
            }
        }); 
    }

    //项目概况--环境监测模块
    function update_environmental_monitoring(){
        $.post(postData['environmental_monitoring']['url'],postData['environmental_monitoring']['params'],function(ret){
            if((typeof ret['showapi_res_code'] !="undefined") && (ret['showapi_res_code'] == 0) && (typeof ret['showapi_res_body'] !="undefined") && (typeof ret['showapi_res_body']['ret_code'] !="undefined") && ret['showapi_res_body']['ret_code'] == 0){
                var html_text = template('environmental_monitoring_temp', ret['showapi_res_body']);
                $('#environmental_monitoring_box').html(html_text);
            }
        },'json'); 
    }

    //项目概况--人员动态模块
    function update_pj_people_dynamic(){
        $.post(postData['pj_people_dynamic']['url'],postData['pj_people_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_people_dynamic_temp', ret);
                $('#pj_people_dynamic_box').html(html_text);
            }
        },'json'); 
    }

    //项目概况--最新动态模块
    function update_pj_new_dynamic(){
        $.post(postData['pj_new_dynamic']['url'],postData['pj_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 3){
                    scroll_new_dynamic("#pj_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        },'json'); 
    }

    //项目概况--概况统计模块
    function update_pj_special_equipment(){
        $.post(postData['pj_special_equipment']['url'],postData['pj_special_equipment']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_special_equipment_temp', ret['data']);
                $('#pj_special_equipment_box').html(html_text);
            }
        }); 
    }

    //项目概况--视频/平面图/bim模块
    function update_project_ex_info(){
        $.post(postData['project_ex_info']['url'],postData['project_ex_info']['params'],function(ret){
            if(ret['code'] == 0){
                public_tmp_data = ret['data'];   
                update_video_moduel('#project_ex_info_box',public_tmp_data['advertising_video']);
            }
        }); 
    }

    //更新全景地图
    function update_panoramic_moduel(element){
        $(element).html('');
        var html_text = '<iframe src="https://720yun.com/t/no7w595mdpsad7o4ia?pano_id=r8xiRFra9SIkDtpi" frameborder="20" scrolling="no" style="position:absolute;top:25px;left:25px;height:487px;width:848px;"></iframe>';
        $(element).html(html_text);
    }

    //更新无人机航拍图
    function update_vehicle_moduel(element,data){
        $(element).html('');
        var html_text = template('pj_show_banner_img_temp', data);
        $(element).html(html_text);
        var tmp_element = element + ' .swiper-container';
        var autoplay = false;
        if(data.images.length > 1){
            autoplay = {
                 delay: 120000,
            };
        }
        var hideOnClick = data.images.length > 1 ? false :true;
        var mySwiper = new Swiper (tmp_element, {
            direction: 'horizontal',
            loop: true,
            autoplay: autoplay,
            speed:1000,
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              hideOnClick: hideOnClick,
            },
        })       

    }

    //更新水位检测图
    function update_water_moduel(element){
        $(element).html('');
        var html_text = '<img src="http://tower-img.1357.cn/plans/20181028/KDMEe5PRfZpmaXPEEa.png" style="position:absolute;top:40px;left:40px;height:460px;width:820px;">';
        $(element).html(html_text);
    }

    //更新视频模块
    function update_video_moduel(element,data){
        $(element).html('');
        var html_text = template('pj_show_video_module_temp', data);
        $(element).html(html_text);
    }

    //更新banner图模块
    function update_banner_image_module(element,data){
        $(element).html('');
        var html_text = template('pj_show_banner_img_temp', data);
        $(element).html(html_text);
        var tmp_element = element + ' .swiper-container';
        var autoplay = false;
        if(data.images.length > 1){
            autoplay = {
                 delay: 120000,
            };
        }
        var hideOnClick = data.images.length > 1 ? false :true;
        var mySwiper = new Swiper (tmp_element, {
            direction: 'horizontal',
            loop: true,
            autoplay: autoplay,
            speed:1000,
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              hideOnClick: hideOnClick,
            },
        })       
    }

    var public_tmp_data;

    if($('#project_ex_info').length > 0){
        update_project_ex_info();
        $('#project_ex_info .select_module').click(function(){
            $('#project_ex_info .select_module').removeClass('selected_type1');
            $(this).addClass('selected_type1');
            var module_type = $(this).attr('data-type');
            if(module_type == 1) {
                update_video_moduel('#project_ex_info_box', public_tmp_data['advertising_video']);
            }else if(module_type == 2){
            	if(public_tmp_data['plan_image'] instanceof Array){
            		var tmp_data = {
	                    'images' : public_tmp_data['plan_image'],
	                };
	                update_banner_image_module('#project_ex_info_box', tmp_data);
            	}else{
            		update_video_moduel('#project_ex_info_box', public_tmp_data['plan_image']);
            	}
                
            }else if(module_type == 3){
                update_video_moduel('#project_ex_info_box', public_tmp_data['bim_video']);
            }else if(module_type == 4){
                update_panoramic_moduel('#project_ex_info_box');
            }else if(module_type == 5){
                update_water_moduel('#project_ex_info_box');
            }else{
                if(public_tmp_data['air_image'] instanceof Array){
            		var tmp_data = {
	                    'images' : public_tmp_data['air_image'],
	                };
	                update_vehicle_moduel('#project_ex_info_box', tmp_data);
            	}else{
            		update_video_moduel('#project_ex_info_box', public_tmp_data['air_image']);
            	}
            }
        });
    }

    if($('#pj_special_equipment').length > 0){
        update_pj_special_equipment();
        window.setInterval(update_pj_special_equipment,1000*60*32); 
    }   

    if($('#project_info').length > 0){
        update_project_info();
        window.setInterval(update_project_info,1000*60*20); 
    }

    if($('#quality_problem_check').length > 0){
        if(postData['first_access'] == 1){
            setTimeout(update_quality_problem_check_type_bar_chart, 3000);
        }else{
            update_quality_problem_check_type_bar_chart();
        }  
        window.setInterval(update_quality_problem_check_type_bar_chart,1000*60*20); 
    }

    if($('#safe_patrol_danger_line_chart').length > 0){
        if(postData['first_access'] == 1){
            setTimeout(update_safe_patrol_danger_line_chart, 3000);
        }else{
            update_safe_patrol_danger_line_chart();
        }  
        window.setInterval(update_safe_patrol_danger_line_chart,1000*60*20); 
    }

    if($('#environmental_monitoring').length > 0){
        update_environmental_monitoring();
        window.setInterval(update_environmental_monitoring,1000*60*30); 
    }

    if($('#pj_people_dynamic').length > 0){
        update_pj_people_dynamic();
        window.setInterval(update_pj_people_dynamic,1000*60*30); 
    }

    if($('#pj_new_dynamic').length > 0){
        update_pj_new_dynamic();
        window.setInterval(update_pj_new_dynamic,1000*60*5); 
    }
})();

(function () {
    var postData = JSON.parse(postDataSource);

     //安全管理--概况统计
    function update_pj_safe_simply_statistics(){
        $.post(postData['pj_safe_simply_statistics']['url'],postData['pj_safe_simply_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_safe_simply_statistics_temp', ret['data']);
                $('#pj_safe_simply_statistics .box_body').html(html_text);
                var data1 = {
                    'name' : '今日检查率',
                    'rate' : ret['data']['today_find_danger_rate'],
                };
                ring_rate_chart('today_check_task_rate',data1);
                var data2 = {
                    'name' : '隐患查出率',
                    'rate' : ret['data']['find_danger_rate'],
                };
                ring_rate_chart('find_danger_rate',data2);
                var data3 = {
                    'name' : '预警隐患率',
                    'rate' : ret['data']['leave_warning_danger_rate'],
                };
                ring_rate_chart('leave_warning_danger_rate',data3);
                var data4 = {
                    'name' : '整改率',
                    'rate' : ret['data']['reform_danger_rate'],
                };
                ring_rate_chart('reform_danger_rate',data4);
                special_ring_rate_chart('special_reform_danger_rate',data4);
            }
        },'json');
        
    }

    //安全管理--隐患类型统计
    function update_pj_safe_danger_type_statistics(){
        var postDatas = postData['pj_safe_danger_type_statistics']['params'];
        postDatas['time_type'] = $('#pj_safe_danger_type_statistics .selected_button').attr('data-type');
        $.post(postData['pj_safe_danger_type_statistics']['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                horizontal_bar_chart('pj_safe_danger_type_bar_chart', ret['data']);
            }
        },'json'); 
    }

    //安全管理--作业类型统计
    function update_pj_safe_task_type_statistics(){
        var postDatas = postData['pj_safe_task_type_statistics']['params'];
        postDatas['time_type'] = $('#pj_safe_task_type_statistics .selected_button').attr('data-type');
        $.post(postData['pj_safe_task_type_statistics']['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                horizontal_bar_chart('pj_safe_task_type_bar_chart', ret['data']);
            }
        },'json'); 
    }

    //安全管理--安全检查模块
    function update_pj_safe_patrol_danger_line_chart(){
        $.post(postData['pj_safe_check_group_time']['url'],postData['pj_safe_check_group_time']['params'],function(ret){
            if(ret['code'] == 0){
                line_chart('pj_safe_patrol_danger_line_chart',ret['data']);
            }
        }); 
    }

    //安全管理--安全验收模块
    function update_pj_safe_check_accept_count(){
        $.post(postData['pj_safe_check_accept_count']['url'], postData['pj_safe_check_accept_count']['params'], function(ret){
            if(ret['code'] == 0){
                pie_double_chart('pj_safe_check_accept_count_pie_chart',ret['data']);
            }
        },'json'); 
    }

    //安全管理--安全检查模块（责任区域/分包单位）
    function update_pj_safe_check_group_type(){
        var data_type = $('#pj_safe_check_group_type .selected_button').attr('data-type');
        console.log(postData['pj_safe_check_group_type'][data_type]['url']);
        $.post(postData['pj_safe_check_group_type'][data_type]['url'], postData['pj_safe_check_group_type'][data_type]['params'], function(ret){
            if(ret['code'] == 0){
                simply_bar_chart('pj_safe_check_group_type_bar_chart',ret['data']);
            }
        },'json'); 
    }

    //安全管理--安全最新动态
    function update_pj_safe_new_dynamic(){
         $.post(postData['pj_safe_new_dynamic']['url'],postData['pj_safe_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 3){
                    scroll_new_dynamic("#pj_safe_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#pj_safe_new_dynamic').length > 0){
        update_pj_safe_new_dynamic();
        window.setInterval(update_pj_safe_new_dynamic,1000*60*30); 
    }

    if($('#pj_safe_check_group_type').length > 0){
        $('#pj_safe_check_group_type .select_button').click(function(){
            $('#pj_safe_check_group_type .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_pj_safe_check_group_type();
        });

        update_pj_safe_check_group_type();
        window.setInterval(update_pj_safe_check_group_type,1000*60*33); 
    }


    if($('#pj_safe_check_accept_count').length > 0){
        update_pj_safe_check_accept_count();
        window.setInterval(update_pj_safe_check_accept_count,1000*60*30); 
    }


    if($('#pj_safe_check_group_time').length > 0){
        update_pj_safe_patrol_danger_line_chart();
        window.setInterval(update_pj_safe_patrol_danger_line_chart,1000*60*33); 
    }

    if($('#pj_safe_simply_statistics').length > 0){
        update_pj_safe_simply_statistics();
        window.setInterval(update_pj_safe_simply_statistics,1000*60*32); 
    }

    if($('#pj_safe_danger_type_statistics').length > 0){
        $('#pj_safe_danger_type_statistics .select_button').click(function(){
            $('#pj_safe_danger_type_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_pj_safe_danger_type_statistics();
        });

        update_pj_safe_danger_type_statistics();
        window.setInterval(update_pj_safe_danger_type_statistics,1000*60*31); 
    }

    if($('#pj_safe_task_type_statistics').length > 0){
        $('#pj_safe_task_type_statistics .select_button').click(function(){
            $('#pj_safe_task_type_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_pj_safe_task_type_statistics();
        });

        update_pj_safe_task_type_statistics();
        window.setInterval(update_pj_safe_task_type_statistics,1000*60*31); 
    }
    
})();

// 公司级-安全管理
(function () {
    var postData = JSON.parse(postDataSource);

     //安全管理--概况统计
    function update_cp_safe_simply_statistics(){
        $.post(postData['cp_safe_simply_statistics']['url'],postData['cp_safe_simply_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_safe_simply_statistics_temp', ret['data']);
                $('#cp_safe_simply_statistics .box_body').html(html_text);
                var data1 = {
                    'name' : '今日检查率',
                    'rate' : ret['data']['today_find_danger_rate'],
                };
                ring_rate_chart('today_check_task_rate',data1);
                var data2 = {
                    'name' : '隐患查出率',
                    'rate' : ret['data']['find_danger_rate'],
                };
                ring_rate_chart('find_danger_rate',data2);
                var data3 = {
                    'name' : '预警隐患率',
                    'rate' : ret['data']['leave_warning_danger_rate'],
                };
                ring_rate_chart('leave_warning_danger_rate',data3);
                var data4 = {
                    'name' : '整改率',
                    'rate' : ret['data']['reform_danger_rate'],
                };
                ring_rate_chart('reform_danger_rate',data4);
                special_ring_rate_chart('special_reform_danger_rate',data4);
            }
        },'json');     
    }

    if($('#cp_safe_simply_statistics').length > 0){
        update_cp_safe_simply_statistics();
        window.setInterval(update_cp_safe_simply_statistics,1000*60*32); 
    }

    //安全管理--安全最新动态
    function update_cp_safe_new_dynamic(){
         $.post(postData['cp_safe_new_dynamic']['url'],postData['cp_safe_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 3){
                    scroll_new_dynamic("#cp_safe_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#cp_safe_new_dynamic').length > 0){
        update_cp_safe_new_dynamic();
        window.setInterval(update_cp_safe_new_dynamic,1000*60*30); 
    }

     //安全管理--隐患类型统计
    function update_cp_safe_danger_type_statistics(){
        var postDatas = postData['cp_safe_danger_type_statistics']['params'];
        postDatas['time_type'] = $('#cp_safe_danger_type_statistics .selected_button').attr('data-type');
        $.post(postData['cp_safe_danger_type_statistics']['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                horizontal_bar_chart('cp_safe_danger_type_bar_chart', ret['data']);
            }
        },'json'); 
    }

    if($('#cp_safe_danger_type_statistics').length > 0){
        $('#cp_safe_danger_type_statistics .select_button').click(function(){
            $('#cp_safe_danger_type_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_cp_safe_danger_type_statistics();
        });

        update_cp_safe_danger_type_statistics();
        window.setInterval(update_cp_safe_danger_type_statistics,1000*60*31); 
    }

    //安全管理--作业类型统计
    function update_cp_safe_task_type_statistics(){
        var postDatas = postData['cp_safe_task_type_statistics']['params'];
        postDatas['time_type'] = $('#cp_safe_task_type_statistics .selected_button').attr('data-type');
        $.post(postData['cp_safe_task_type_statistics']['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                horizontal_bar_chart('cp_safe_task_type_bar_chart', ret['data']);
            }
        },'json'); 
    }

    if($('#cp_safe_task_type_statistics').length > 0){
        $('#cp_safe_task_type_statistics .select_button').click(function(){
            $('#cp_safe_task_type_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_cp_safe_task_type_statistics();
        });

        update_cp_safe_task_type_statistics();
        window.setInterval(update_cp_safe_task_type_statistics,1000*60*31); 
    }

    //安全管理--安全检查模块
    function update_cp_safe_patrol_danger_line_chart(){
        $.post(postData['cp_safe_check_group_time']['url'],postData['cp_safe_check_group_time']['params'],function(ret){
            if(ret['code'] == 0){
                bar_double_chart('cp_safe_patrol_danger_line_chart',ret['data']);
            }
        }); 
    }

    if($('#cp_safe_check_group_time').length > 0){
        update_cp_safe_patrol_danger_line_chart();
        window.setInterval(update_cp_safe_patrol_danger_line_chart,1000*60*33); 
    }

    //安全管理--检查隐患列表
    function update_cp_safe_check_danger_count(){
        $.post(postData['cp_safe_check_danger_count']['url'],postData['cp_safe_check_danger_count']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data'].length > 0){
                    var html_text = template('cp_safe_check_danger_count_li_temp', ret);
                    $('#cp_safe_check_danger_count .content_list').html(html_text);
                }
                if(ret['data'].length > 6){
                    scroll_new_dynamic("#cp_safe_check_danger_count .content_box",4500,2500);
                }
                
            }
        }); 
    }

    if($('#cp_safe_check_danger_count').length > 0){
        update_cp_safe_check_danger_count();
        window.setInterval(update_cp_safe_check_danger_count,1000*60*30); 
    }

    //安全管理--验收次数统计
    function update_cp_safe_check_accept_count(){
        var postDatas = postData['cp_safe_check_accept_count']['params'];
        postDatas['time_type'] = $('#cp_safe_check_accept_count .selected_button').attr('data-type');
        $.post(postData['cp_safe_check_accept_count']['url'],postData['cp_safe_check_accept_count']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data'].length > 0){
                    var html_text = template('cp_safe_check_accept_count_li_temp', ret);
                    $('#cp_safe_check_accept_count .content_list').html(html_text);
                }
                if(ret['data'].length > 6){
                    scroll_new_dynamic("#cp_safe_check_accept_count .content_box",4500,2500);
                }
                
            }
        }); 
    }

    if($('#cp_safe_check_accept_count').length > 0){
        $('#cp_safe_check_accept_count .select_button').click(function(){
            $('#cp_safe_check_accept_count .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_cp_safe_check_accept_count();
        });
        update_cp_safe_check_accept_count();
        window.setInterval(update_cp_safe_check_accept_count,1000*60*30); 
    }
})();

//项目级-质量管理
(function () {
    var postData = JSON.parse(postDataSource);

     //质量管理--概况统计
    function update_pj_quality_simply_statistics(){
        $.post(postData['pj_quality_simply_statistics']['url'],postData['pj_quality_simply_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_quality_simply_statistics_temp', ret['data']);
                $('#pj_quality_simply_statistics .box_body').html(html_text);
                var data1 = {
                    'name' : '今日查出率',
                    'rate' : ret['data']['today_problem_rate'],
                };
                ring_rate_chart('today_quality_check_problem_rate',data1);
                var data2 = {
                    'name' : '问题查出率',
                    'rate' : ret['data']['problem_rate'],
                };
                ring_rate_chart('quality_check_problem_rate',data2);
                var data3 = {
                    'name' : '预警问题率',
                    'rate' : ret['data']['leave_warning_problem_rate'],
                };
                ring_rate_chart('leave_warning_problem_rate',data3);
                var data4 = {
                    'name' : '整改率',
                    'rate' : ret['data']['build_rate'],
                };
                ring_rate_chart('quality_reform_danger_rate',data4);
                special_ring_rate_chart('special_quality_reform_danger_rate',data4);
            }
        },'json');
        
    }

    //质量管理--质量问题统计
    function update_pj_quality_problem_type_statistics(){
        var postDatas = postData['pj_quality_problem_type_statistics']['params'];
        postDatas['time_type'] = $('#pj_quality_problem_type_statistics .selected_button').attr('data-type');
        $.post(postData['pj_quality_problem_type_statistics']['url'], postDatas, function(ret){
            
            if(ret['code'] == 0){
                horizontal_bar_chart('pj_quality_problem_type_bar_chart', ret['data']);
            }
        },'json'); 
    }


    //质量管理--质量检查模块
    function update_pj_quality_check_group_time_line_chart(){
        $.post(postData['pj_quality_check_group_time']['url'],postData['pj_quality_check_group_time']['params'],function(ret){
        	console.log(ret.code);
            if(ret['code'] == 0){
            	
//              var data = new Array();
//              var series = new Array();
//              data['xAxis_data'] = ret['data']['legend_data'];
//              series[0] = new Array();
//              series[0]['data'] = ret['data']['series_danger_data'];
//              series[0]['name'] = '提交隐患';
//              series[1] = new Array();
//              series[1]['data'] = ret['data']['series_patrol_data'];
//              series[1]['name'] = '检查次数';
//              data['series_data'] = series;
                line_chart('pj_quality_check_group_time_line_chart',ret['data']);
            }
        }); 
    }

    //质量管理--质量验收模块
    function update_pj_quality_check_accept_count(){
        $.post(postData['pj_quality_check_accept_count']['url'], postData['pj_quality_check_accept_count']['params'], function(ret){
            if(ret['code'] == 0){
                pie_double_chart('pj_quality_check_accept_count_pie_chart',ret['data']);
            }
        },'json'); 
    }

     //质量管理--质量检查模块（责任区域/分包单位）
    function update_pj_quality_check_group_type(){
        var postDatas = postData['pj_quality_check_group_type']['params'];
        postDatas['content_type'] = $('#pj_quality_check_group_type .selected_button').attr('data-type');
        $.post(postData['pj_quality_check_group_type']['url'], postData['pj_quality_check_group_type']['params'], function(ret){
            if(ret['code'] == 0){
                simply_bar_chart('pj_quality_check_group_type_bar_chart',ret['data']);
            }
        },'json'); 
    }

    //质量管理--质量最新动态
    function update_pj_quality_new_dynamic(){
         $.post(postData['pj_quality_new_dynamic']['url'],postData['pj_quality_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 8){
                    scroll_new_dynamic("#pj_quality_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#pj_quality_new_dynamic').length > 0){
        update_pj_quality_new_dynamic();
        window.setInterval(update_pj_quality_new_dynamic,1000*60*30); 
    }

    if($('#pj_quality_check_group_type').length > 0){
        $('#pj_quality_check_group_type .select_button').click(function(){
            $('#pj_quality_check_group_type .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_pj_quality_check_group_type();
        });
        update_pj_quality_check_group_type();
        window.setInterval(update_pj_quality_check_group_type,1000*60*33); 
    }

    if($('#pj_quality_check_accept_count').length > 0){
        update_pj_quality_check_accept_count();
        window.setInterval(update_pj_quality_check_accept_count,1000*60*30); 
    }


    if($('#pj_quality_check_group_time').length > 0){
        update_pj_quality_check_group_time_line_chart();
        window.setInterval(update_pj_quality_check_group_time_line_chart,1000*60*33); 
    }

    if($('#pj_quality_simply_statistics').length > 0){
        update_pj_quality_simply_statistics();
        window.setInterval(update_pj_quality_simply_statistics,1000*60*32); 
    }

    if($('#pj_quality_problem_type_statistics').length > 0){
        $('#pj_quality_problem_type_statistics .select_button').click(function(){
            $('#pj_quality_problem_type_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_pj_quality_problem_type_statistics();
        });

        update_pj_quality_problem_type_statistics();
        window.setInterval(update_pj_quality_problem_type_statistics,1000*60*31); 
    }

    // if($('#pj_quality_check_group_type').length > 0){   
    //     var data = {
    //         'legend_data' : ['检查次数','提交隐患数'],
    //         'xAxis_data'  : ['江西智锋工程建设有限公司','江西省龙旗建设有限公司','中建东方装饰有限公司','武汉勤明运建筑劳务有限公司',
    //         '武汉东科装饰工程有限公司','湖北煜晟建筑装饰工程有限公司','湖北创富装饰工程有限公司','武汉辰和平建筑劳务有限公司',
    //         '强隆建设集团有限公司','江西爱比新型建材有限责任公司','江西鑫瑞建设工程有限公司'],
    //         'series_data' : [
    //             [9,5,8,7,3,6,14,24,13,10,9],
    //             [6,21,14,18,16,3,15,7,9,14,17]
    //         ],
    //     };
    //     var data = {
    //         'name' : '提交隐患数',
    //         'xAxis_data'  : ['江西智锋工程建设有限公司','江西省龙旗建设有限公司','中建东方装饰有限公司','武汉勤明运建筑劳务有限公司',
    //         '武汉东科装饰工程有限公司','湖北煜晟建筑装饰工程有限公司','湖北创富装饰工程有限公司','武汉辰和平建筑劳务有限公司',
    //         '强隆建设集团有限公司','江西爱比新型建材有限责任公司','江西鑫瑞建设工程有限公司'],
    //         'series_data' : [9,5,8,7,3,6,14,24,13,10,9],
    //     }
    //     simply_bar_chart('pj_quality_check_group_type_bar_chart',data);
    // }
    
})();

//公司级-质量管理
(function () {
    var postData = JSON.parse(postDataSource);

     //质量管理--概况统计
    function update_cp_quality_simply_statistics(){
        $.post(postData['cp_quality_simply_statistics']['url'],postData['cp_quality_simply_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_quality_simply_statistics_temp', ret['data']);
                $('#cp_quality_simply_statistics .box_body').html(html_text);
                var data1 = {
                    'name' : '今日查出率',
                    'rate' : ret['data']['today_problem_rate'],
                };
                ring_rate_chart('today_quality_check_problem_rate',data1);
                var data2 = {
                    'name' : '问题查出率',
                    'rate' : ret['data']['problem_rate'],
                };
                ring_rate_chart('quality_check_problem_rate',data2);
                var data3 = {
                    'name' : '预警问题率',
                    'rate' : ret['data']['leave_warning_problem_rate'],
                };
                ring_rate_chart('leave_warning_problem_rate',data3);
                var data4 = {
                    'name' : '整改率',
                    'rate' : ret['data']['build_rate'],
                };
                ring_rate_chart('quality_reform_danger_rate',data4);
                special_ring_rate_chart('special_quality_reform_danger_rate',data4);
            }
        },'json');     
    }

    if($('#cp_quality_simply_statistics').length > 0){
        update_cp_quality_simply_statistics();
        window.setInterval(update_cp_quality_simply_statistics,1000*60*32); 
    }

    //质量管理--质量最新动态
    function update_cp_quality_new_dynamic(){
         $.post(postData['cp_quality_new_dynamic']['url'],postData['cp_quality_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 8){
                    scroll_new_dynamic("#cp_quality_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#cp_quality_new_dynamic').length > 0){
        update_cp_quality_new_dynamic();
        window.setInterval(update_cp_quality_new_dynamic,1000*60*30); 
    }

    //质量管理--质量问题统计
    function update_cp_quality_problem_type_statistics(){
        var postDatas = postData['cp_quality_problem_type_statistics']['params'];
        postDatas['time_type'] = $('#cp_quality_problem_type_statistics .selected_button').attr('data-type');
        $.post(postData['cp_quality_problem_type_statistics']['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                horizontal_bar_chart('cp_quality_problem_type_bar_chart', ret['data']);
            }
        },'json'); 
    }

    if($('#cp_quality_problem_type_statistics').length > 0){
        $('#cp_quality_problem_type_statistics .select_button').click(function(){
            $('#cp_quality_problem_type_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_cp_quality_problem_type_statistics();
        });

        update_cp_quality_problem_type_statistics();
        window.setInterval(update_cp_quality_problem_type_statistics,1000*60*31); 
    }

    //质量管理--质量验收模块
    function update_cp_quality_check_accept_count(){
        $.post(postData['cp_quality_check_accept_count']['url'], postData['cp_quality_check_accept_count']['params'], function(ret){
            if(ret['code'] == 0){
                pie_double_chart('cp_quality_check_accept_count_pie_chart',ret['data']);
            }
        },'json'); 
    }

    if($('#cp_quality_check_accept_count').length > 0){
        update_cp_quality_check_accept_count();
        window.setInterval(update_cp_quality_check_accept_count,1000*60*30); 
    }


    //质量管理--质量检查模块
    function update_cp_quality_check_group_project_line_chart_chart(){
        $.post(postData['cp_quality_check_group_project']['url'],postData['cp_quality_check_group_project']['params'],function(ret){
            if(ret['code'] == 0){
                bar_double_chart('cp_quality_check_group_project_line_chart',ret['data']);
            }
        }); 
    }

    if($('#cp_quality_check_group_project').length > 0){
        update_cp_quality_check_group_project_line_chart_chart();
        window.setInterval(update_cp_quality_check_group_project_line_chart_chart,1000*60*33); 
    }

    //质量管理--检查问题统计列表
    function update_cp_quality_check_danger_count(){
        $.post(postData['cp_quality_check_danger_count']['url'],postData['cp_quality_check_danger_count']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data'].length > 0){
                    var html_text = template('cp_quality_check_danger_count_li_temp', ret);
                    $('#cp_quality_check_danger_count .content_list').html(html_text);
                }
                if(ret['data'].length > 6){
                    scroll_new_dynamic("#cp_quality_check_danger_count .content_box",4500,2500);
                }
                
            }
        }); 
    }

    if($('#cp_quality_check_danger_count').length > 0){
        update_cp_quality_check_danger_count();
        window.setInterval(update_cp_quality_check_danger_count,1000*60*30); 
    }
})();

//物联监测处理（公司级）
(function () {
    var postData = JSON.parse(postDataSource);
    //环境监测
    function update_cp_iot_environment_count(){
        $.post(postData['cp_iot_environmental_monitoring']['url'],postData['cp_iot_environmental_monitoring']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data'].length > 0){
                    var html_text = template('cp_iot_environment_temp', ret);
                    $('#cp_iot_environment_list .content_list').html(html_text);
                }
                if(ret['data'].length > 6){
                    scroll_new_dynamic("#cp_iot_environment_list .content_box",4500,2500);
                }
                
            }
        }); 
    }
    
    
    //水电监测
    function update_cp_iot_water_count(){
        $.post(postData['cp_iot_water_or_watt_monitoring']['url'],postData['cp_iot_water_or_watt_monitoring']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data'].length > 0){
                    var html_text = template('cp_iot_water_temp', ret);
                    $('#cp_iot_water_list .content_list').html(html_text);
                }
                if(ret['data'].length > 15){
                    scroll_new_dynamic("#cp_iot_water_list .content_box",4500,2500);
                }
                
            }
        }); 
    }
    
    //烟雾感应
    function update_cp_iot_smoke_count(){
        $.post(postData['cp_iot_smoke_monitoring']['url'],postData['cp_iot_smoke_monitoring']['params'],function(ret){
            if(ret['code'] == 0){
                    var html_text = template('cp_iot_smoke_temp', ret);
                    $('#cp_iot_smoke_monitoring .box_body').html(html_text);           
            }
        }); 
    }
    
    
    //标养室监测
    function update_cp_iot_soil_count(){
        $.post(postData['cp_iot_soil_monitoring']['url'],postData['cp_iot_soil_monitoring']['params'],function(ret){
            if(ret['code'] == 0){
                    var html_text = template('cp_iot_soil_temp', ret);
                    $('#cp_iot_soil_monitoring .box_body').html(html_text);            
            }
        }); 
    }
    
    
    //更新视频平面图
    function update_cp_iot_video(select_org_id){
        var postDatas = postData['cp_iot_video_monitoring']['params'];
        postDatas.select_org_id = select_org_id;
        $.post(postData['cp_iot_video_monitoring']['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                $("#map").html("");
                if(ret['data'] != false) {
                    var map;
                    init_cp_iot_monitor_area(ret['data']);
                }else{
                	$("#map").html("<img src='/Admin/image/smart_screen/no_data.png' width='100%' height='420'>");
                }
                
            }else{
                layer.msg(ret['msg']);
            }
        },'json'); 
    }
    
    
    ///物联监测-平面图监控
    function init_cp_iot_monitor_area(datas){
        var image = datas['image'];
        var priority = datas['priority'];
        var monitor  = datas['monitor'];

        if(typeof image != 'undefined' && typeof image['url'] != 'undefined'){
            if(priority == 'width'){
                var width   = 530;
                var rate = width / image['width'];
                var height  = rate * image['height'];
            }else{
                var width  = image['width'];
                var height = image['height']; 
            } 
            var bounds = [[0,0], [height,width]];
            if(map)
                map.remove();
            map = L.map('map', {
                crs: L.CRS.Simple,
                maxZoom: 8,
                minZoom: -1,
                maxBounds: bounds
            });
            map.getContainer().style.width = '530px';
            map.getContainer().style.height= '420px';
            document.body.style.margin = 0;

            map.fitBounds(bounds);
            L.imageOverlay(image['url'], bounds,{interactive:true}).addTo(map);
            var myIcon = L.divIcon({className: 'monitor_point1'});  
            $.each(monitor, function(k,v){
                switch(v['point_type']){
                    case 1:
                        // myIcon = L.divIcon({className: 'monitor_point1'});
                        myIcon = L.divIcon({className:'monitor_point1',html:'<div class="monitor_point1" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                        break;
                    case 2:
                        // myIcon = L.divIcon({className: 'monitor_point2'});
                        myIcon = L.divIcon({className:'monitor_point2',html:'<div class="monitor_point2" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                        break;
                    case 3:
                        // myIcon = L.divIcon({className: 'monitor_point3'});
                        myIcon = L.divIcon({className:'monitor_point3',html:'<div class="monitor_point3" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                        break;
                    default:
                        // myIcon = L.divIcon({className: 'monitor_point1'});
                        myIcon = L.divIcon({className:'monitor_point1',html:'<div class="monitor_point1" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                        break;
                }
                if(priority == 'width'){
                   var point = new Array();
                   point[0] = v['point'][0] * rate;
                   point[1] = v['point'][1] * rate;
                }else{
                    var point = v['point'];
                } 
                L.marker(point, {icon: myIcon}).addTo(map).on(
                    'click',
                    (function (v) {
                        return function(){
                            if(v['video_type'] == 1){
                                var html = template('tmpl_video', { id: 'video_' + v['id'], url: v['url'] });
                                layer.open({
                                    type: 1,
                                    title: false,
                                    closeBtn: 0,
                                    area: ['600px', '305px'],
                                    shadeClose: false,
                                    skin: 'layui-layer-nobg',
                                    content: html,
                                    success: function (layero, index) {
                                        init_video('video_' + v['id']);
                                    }
                                });
                            }else if(v['video_type'] == 2){
                                article_add2('',v['url']+'?code='+v['code'],'620px','490px');
                                $('.layui-layer-content').css({
                                    'overflow' : 'hidden',
                                });
                                $('.layui-layer-title').css({
                                    'background-color':'rgba(0,0,0,0.8)',
                                    'border':0,
                                    'height':'20px',
                                });
                                $('.iframe').css({
                                    'overflow' : 'hidden',
                                });
                                $('.layui-layer-load').css({
                                    'background-color'      : 'rgba(0,0,0,0.8)',
                                    'background-image'      : 'url()',
                                });
                            }
                        };      
                    })(v)
                )
            });
            
        } else {
            L.imageOverlay('/Admin/image/no-image.png', bounds,{interactive:true}).addTo(map);
        }
    }
    
    
    //项目选择
    if($('.cp_iot_select_org').length > 0){
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: false,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {   
                    var postData = {org_id:treeNode.id};
                    select_org_id = treeNode.id;
                    $(".cp_iot_select_org span").html(treeNode.name);
                    $(".cp_iot_select_org span").attr('data-id',treeNode.id);
                    $('.select_org_list').css('display','none');
                    
                    update_cp_iot_video(select_org_id);
                } 
            }
        };

        
        var t2 = $("#cp_iot_can_orgs");
        t2 = $.fn.zTree.init(t2, setting, zNodes);
        t2.expandNode();

        $('#cp_iot_can_orgs .ico_open').remove();
        $('#cp_iot_can_orgs .ico_close').remove();
        $('#cp_iot_can_orgs .ico_docu').remove();

        var flag = 0;
        $('.cp_iot_select_org').click(function(){
            $('.select_org_list').css('display','none');
            if(flag == 0){
                $('.select_org_list').css('display','block');
                flag = 1;  
            }else{
                 $('.select_org_list').css('display','none');
                flag = 0;  
            }
        });
    }
    
    
    if($('#cp_iot_soil_monitoring').length > 0){
        update_cp_iot_soil_count();
        window.setInterval(update_cp_iot_soil_count,1000*60*30); 
    }
    
    
    if($('#cp_iot_smoke_monitoring').length > 0){
        update_cp_iot_smoke_count();
        window.setInterval(update_cp_iot_smoke_count,1000*60*30); 
    }
    
    
    if($('#cp_iot_environment_monitoring').length > 0){
        update_cp_iot_environment_count();
        window.setInterval(update_cp_iot_environment_count,1000*60*30); 
    }
    
    
    if($('#cp_iot_water_or_watt_monitoring').length > 0){
        update_cp_iot_water_count();
        window.setInterval(update_cp_iot_water_count,1000*60*30); 
    }

    if($("#cp_iot_video_monitoring").length > 0){
    	update_cp_iot_video(-1);
        $("body").delegate("#monitor_video_elastic_layer_body .type_select li", "click", function(){
            $("#monitor_video_elastic_layer_body .page_num").html(1);
            $("#monitor_video_elastic_layer_body .type_select li").removeClass("selected");
            $(this).addClass("selected");
            update_monitor_video_matrix();
        });

        $("body").delegate("#monitor_video_elastic_layer_body .matrix_select li", "click", function(){
            $("#monitor_video_elastic_layer_body .page_num").html(1);
            $("#monitor_video_elastic_layer_body .matrix_select li").removeClass("selected");
            $(this).addClass("selected");
            update_monitor_video_matrix();
        });

        $("body").delegate("#monitor_video_elastic_layer_body .previous_page", "click", function(){
            var page = parseInt($("#monitor_video_elastic_layer_body .page_num").html());
            if(page == 1){
                layer.msg("当前已是第一页！");
                return;
            }
            $("#monitor_video_elastic_layer_body .page_num").html(page - 1);
            var ret = update_monitor_video_matrix();

            if(!ret){
                $("#monitor_video_elastic_layer_body .page_num").html(page);
            }
        });

        $("body").delegate("#monitor_video_elastic_layer_body .next_page", "click", function(){
            var page = parseInt($("#monitor_video_elastic_layer_body .page_num").html());
            $("#monitor_video_elastic_layer_body .page_num").html(page + 1);
            var ret = update_monitor_video_matrix();

            if(!ret){
                $("#monitor_video_elastic_layer_body .page_num").html(page);
            }
        });

        //更新弹窗视频
        function update_monitor_video_matrix(){
            postData['cp_iot_video_monitoring']['layer'][1]['params']['page'] = $("#monitor_video_elastic_layer_body .page_num").html();
            postData['cp_iot_video_monitoring']['layer'][1]['params']['type'] = $("#monitor_video_elastic_layer_body .type_select .selected").attr('data-type');
            if($("#monitor_video_elastic_layer_body .matrix_select .selected").attr('data-type') == 1){
                postData['cp_iot_video_monitoring']['layer'][1]['params']['row'] = 1;
                postData['cp_iot_video_monitoring']['layer'][1]['params']['col'] = 2;
            }else if($("#monitor_video_elastic_layer_body .matrix_select .selected").attr('data-type') == 2){
                postData['cp_iot_video_monitoring']['layer'][1]['params']['row'] = 2;
                postData['cp_iot_video_monitoring']['layer'][1]['params']['col'] = 3;
            }
            postData['cp_iot_video_monitoring']['layer'][1]['params']['width'] = $("#monitor_video_elastic_layer_body").width();
            postData['cp_iot_video_monitoring']['layer'][1]['params']['height'] = $("#monitor_video_elastic_layer_body").height();

            $.post(postData['cp_iot_video_monitoring']['layer'][1]['url'],postData['cp_iot_video_monitoring']['layer'][1]['params'],function(ret){
                if(ret['code'] == 0){
                    $('#monitor_video_elastic_layer_body .page_num').html(ret['data']['page']);
                    var video_matrix  = template("monitor_video_elastic_matrix_temp", ret);
                    $('#monitor_video_elastic_layer_body .monitor_video_list').html(video_matrix); 

                    $.each( ret['data']['video'], function(i, n){
                        var temp_id = "video_" + i;
                        init_video(temp_id);
                    });

                    $("embed").css({
                        'left' : '7%',
                        'top' : '7%',
                    });
                    
                    return true;
                }else{
                    layer.msg("暂无相关数据");
                    return false;
                }
            }); 
        }

        $("#cp_iot_video_monitoring .module_name").click(function(){
            $.post(postData['cp_iot_video_monitoring']['layer'][0]['url'],postData['cp_iot_video_monitoring']['layer'][0]['params'],function(ret){
                if(ret['code'] == 0){
                    ret.code = $('#container').css("transform");
                    var video_layer  = template("monitor_video_elastic_layer_temp", ret);
                    $('body').append(video_layer);
                    update_monitor_video_matrix();
                }else{
                    layer.msg("暂无相关数据");
                }
            }); 
        });
    }
    
})();

//项目级-视频监控模块
(function () {
    var postData = JSON.parse(postDataSource);

    if($("#pj_monitor_video_grid_type").length > 0){
        $.post(postData['pj_monitor_video_grid_type']['type']['url'],postData['pj_monitor_video_grid_type']['type']['params'],function(ret){
            if(ret['code'] == 0){
                var video_matrix  = template("monitor_video_grid_type_temp", ret);
                $('#pj_monitor_video_grid_type .monitor_video_outer_box').html(video_matrix); 
                update_monitor_video_matrix();
            }else{
                layer.msg("暂无相关数据");
                return false;
            }
        }); 

        $("body").delegate("#pj_monitor_video_grid_type .type_select li", "click", function(){
            $("#pj_monitor_video_grid_type .page_num").html(1);
            $("#monitor_video_elastic_layer_body .type_select li").removeClass("selected");
            $(this).addClass("selected");
            update_monitor_video_matrix();
        });

        $("body").delegate("#pj_monitor_video_grid_type .matrix_select li", "click", function(){
            $("#pj_monitor_video_grid_type .page_num").html(1);
            $("#monitor_video_elastic_layer_body .matrix_select li").removeClass("selected");
            $(this).addClass("selected");
            update_monitor_video_matrix();
        });

        $("body").delegate("#pj_monitor_video_grid_type .previous_page", "click", function(){
            var page = parseInt($("#monitor_video_elastic_layer_body .page_num").html());
            if(page == 1){
                layer.msg("当前已是第一页！");
                return;
            }
            $("#pj_monitor_video_grid_type .page_num").html(page - 1);
            var ret = update_monitor_video_matrix();

            if(!ret){
                $("#pj_monitor_video_grid_type .page_num").html(page);
            }
        });

        $("body").delegate("#pj_monitor_video_grid_type .next_page", "click", function(){
            var page = parseInt($("#pj_monitor_video_grid_type .page_num").html());
            $("#pj_monitor_video_grid_type .page_num").html(page + 1);
            var ret = update_monitor_video_matrix();

            if(!ret){
                $("#pj_monitor_video_grid_type .page_num").html(page);
            }
        });
                
        //更新弹窗视频
        function update_monitor_video_matrix(){
            postData['pj_monitor_video_grid_type']['video']['params']['page'] = $("#pj_monitor_video_grid_type .page_num").html();
            postData['pj_monitor_video_grid_type']['video']['params']['type'] = $("#pj_monitor_video_grid_type .type_select .selected").attr('data-type');
            if($("#pj_monitor_video_grid_type .matrix_select .selected").attr('data-type') == 1){
                postData['pj_monitor_video_grid_type']['video']['params']['row'] = 1;
                postData['pj_monitor_video_grid_type']['video']['params']['col'] = 2;
            }else if($("#pj_monitor_video_grid_type .matrix_select .selected").attr('data-type') == 2){
                postData['pj_monitor_video_grid_type']['video']['params']['row'] = 2;
                postData['pj_monitor_video_grid_type']['video']['params']['col'] = 3;
            }
            postData['pj_monitor_video_grid_type']['video']['params']['width'] = $("#pj_monitor_video_grid_type").width();
            postData['pj_monitor_video_grid_type']['video']['params']['height'] = $("#pj_monitor_video_grid_type").height();

            $.post(postData['pj_monitor_video_grid_type']['video']['url'],postData['pj_monitor_video_grid_type']['video']['params'],function(ret){
                if(ret['code'] == 0){
                    $('#pj_monitor_video_grid_type .page_num').html(ret['data']['page']);
                    var video_matrix  = template("monitor_video_elastic_matrix_temp", ret);
                    $('#pj_monitor_video_grid_type .monitor_video_list').html(video_matrix); 

                    $.each( ret['data']['video'], function(i, n){
                        var temp_id = "video_" + i;
                        init_video(temp_id);
                    });

                    $("embed").css({
                        'left' : '7%',
                        'top' : '7%',
                    });
                    
                    return true;
                }else{
                    layer.msg("暂无相关数据");
                    return false;
                }
            }); 
        }
    }
})();

//物联监测处理(项目)
(function () {
    var postData = JSON.parse(postDataSource);

    function multy_y_series_line_chart(id, data) {
        var myChartNew = echarts.init($('#water_elec_line_chart')[0]);
        var option = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                show:false,
                data:data['legend'],
                textStyle:{
                    color: '#fff'
                },
                top:30,
                right:'18%',
            },
            grid:{
                left: '10%',
                right: '15%',
                bottom: '9%',
                top: '12%',
            },
            xAxis: [
                {
                    type: 'category',
                    data: data['xAxis'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#26D9FF'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 14,
                            color:'#9199A0'
                        },
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: data['yAxis_unit1'],
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#26D9FF'
                        }
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            fontSize: 14,
                            color:'#9199A0'
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show:false,
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                {
                    type: 'value',
                    name: data['yAxis_unit2'],
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#26D9FF'
                        }
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            fontSize: 14,
                            color:'#9199A0'
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show:false,
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }
            ],
            series: data['series'],
            color:['#26D9FF','#F9A555'],
        };
        myChartNew.setOption(option); 
    }
    
    function line_chart(id, data){
        var myChartNew = echarts.init(document.getElementById(id));
        if(data['smooth']){
            var smooth = data['smooth'] == 2?false:true;
        }else{
            var smooth = true;
        }
        option = {
            // backgroundColor: '#394056',
            title: {
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            },
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 14,
                itemGap: 13,
                width:800,
                data: [],
                right: 'center',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: '3%',
                right: '8%',
                bottom: '4%',
                top: '8%',
                containLabel: true
            },
            // dataZoom : [{
            //     show: true,
            //     start: 0,
            //     end: 50
            // }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#26D9FF'
                    }
                },
                axisLabel:{
                    margin: 20,
                    textStyle: {
                        fontSize: 14,
                        color:'#9199A0'
                    },
                },
                data: data['xAxis_data']
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#26D9FF'
                    }
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: 14,
                        color:'#9199A0'
                    },
                },
                splitLine: {
                    show:false,
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: smooth,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: true,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 206, 209, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 206, 209, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(0, 206, 209)',
                        borderColor: 'rgba(0, 206, 209, 0.2)',
                        borderWidth: 12
    
                    }
                },
                data: []
            }, {
                name: '',
                type: 'line',
                smooth: smooth,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(9, 161, 193, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(9, 161, 193, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(9, 161, 193)',
                        borderColor: 'rgba(9, 161, 193,0.2)',
                        borderWidth: 12
    
                    }
                },
                data: []
            }, {
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(21, 82, 98, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(21, 82, 98, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
    
                        color: 'rgb(21, 82, 98)',
                        borderColor: 'rgba(21, 82, 98, 0.2)',
                        borderWidth: 12
                    }
                },
                data: []
            }, {
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(23, 61, 73, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(23, 61, 73, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
    
                        color: 'rgb(23, 61, 73)',
                        borderColor: 'rgba(23, 61, 73, 0.2)',
                        borderWidth: 12
                    }
                },
                data: []
            }]
        };
    
        $.each(data['series_data'],function(k,v){
            option['series'][k]['name'] = v['name'];
            option['series'][k]['data'] = v['data'];
        });
    
    	console.log(option);
    
        myChartNew.setOption(option);
    
    }

    //项目概况--环境监测模块
    function update_iot_environmental_monitoring(){
        $.post(postData['pj_iot_environmental_monitoring']['url'],postData['pj_iot_environmental_monitoring']['params'],function(ret){
            if((ret['data']['showapi_body']) && (ret['data']['showapi_body']['ret_code'] == 0)) {
            	var html_text = template('iot_environmental_monitoring_temp', ret['data']);
            	$('#pj_iot_environment_monitoring .box_body').html(html_text);
                if(postData['access_org_id'] == 1999) {
                    queryWeatherInfo();
                }
            }
        },'json'); 
    }

    //渲染晴雨表
    function queryWeatherInfo() {
        $.ajax({
            url: java_smart_screen+"environmentData/environmentalWeather",
            data: {orgId:postData['access_org_id']},
            type: "GET",
            dataType: "json",
            async:false,
            contentType: 'application/json',
            success: function(ret) {
                if (ret.code == 200) {
                    weatherInfo = ret.body;
                }
            }
        })
        var eventData = [];
        $.each(weatherInfo, function(i, v) {
            eventData[i] = new Array();
            eventData[i]['date'] = v.date;
            eventData[i]['classname'] = v.classname;
        });
        $("#weather_calendar").zabuto_calendar({
            data: eventData,
            language: "cn",
            today: true,
            show_days: true,
            weekstartson: 0,
        });
    }

    //项目概况--人员动态模块
    function update_pj_people_dynamic(){
        $.post(postData['pj_iot_people_dynamic']['url'],postData['pj_iot_people_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_iot_staff_monitoring_temp', ret);
                $('#pj_iot_staff_monitoring .box_body ').html(html_text);
            }
        },'json'); 
    }
    
    //项目概况--水电监测模块
    function update_pj_water_or_watt_statistics(){
        $.post(postData['pj_iot_water_or_watt_statistics']['url'],postData['pj_iot_water_or_watt_statistics']['params'],function(ret){
            if(ret['data']){
                var xAxis = new Array();
                $.each(ret['data']['line_chart_2']['xAxis'], function(i, n){
                    xAxis.push(n.substring(5,10));
                });
                var data = new Array();
                data['legend']      = ['水量','电量'];
                data['xAxis']       = xAxis;
                data['yAxis_unit1'] = '吨';
                data['yAxis_unit2'] = 'kW.h';
                data['series']      = ret['data']['line_chart_2']['series'];
                $.each(data['series'], function (i, n) {
                	data['series'][i]['symbol'] = 'circle';
                	data['series'][i]['symbolSize'] = 5;
                	data['series'][i]['showSymbol'] = true;
                	data['series'][i]['itemStyle'] = {
                		'normal': {
			                'color'       : i == 0 ? 'rgba(38, 217, 255, 1)' : 'rgba(249, 165, 85, 1)',
			                'borderColor' : i == 0 ? 'rgba(38, 217, 255, 0.2)' : 'rgba(249, 165, 85, 0.2)',
			                'borderWidth' : 12
			            },
                	};
                	data['series'][i]['smooth'] = true;
                	if(i == 1) 
                		data['series'][i]['yAxisIndex'] = 1;
                })              
            }else{
                var data = new Array();
                data['legend']      = ['水量','电量'];
                data['xAxis']       = ['暂无数据'];
                data['yAxis_unit1'] = '吨';
                data['yAxis_unit2'] = 'kW.h';
                data['series']      = [0];
                $.each(data['series'], function (i, n) {
                	data['series'][i]['smooth'] = true;
                })
            }
            console.log(data);
            multy_y_series_line_chart('water_elec_line_chart', data);
        },'json'); 
    }

    //项目概况--喷淋监测模块
    function update_pj_spray_statistics(){
        $.post(postData['pj_iot_spray_statistics']['url'],postData['pj_iot_spray_statistics']['params'],function(ret){
            if(ret['data']){
                var series = new Array();
                var data = new Array();
                var name = '喷淋时长';
                data['xAxis_data'] = ret['data']['time'];
                series = [
                    {
                        name: name,
                        data: ret['data']['value'],
                        type: 'line',
                    }
                ];
                data['series_data'] = series;
                data['smooth'] = 2;
                
            }else{
                var series = new Array();
                var data = new Array();
                var name = '喷淋时长';
                data['xAxis_data'] = ['暂无数据'];
                series = [
                    {
                        name: name,
                        data: [0],
                        type: 'line',
                    }
                ];
                data['series_data'] = series;
                data['smooth'] = 2;
            }
            line_chart('spray_line_chart',data);
        },'json');      
    }
    
    //项目概况--烟雾感应模块
    function update_pj_smoke_statistics(){
        $.post(postData['pj_iot_smoke_statistics']['url'],postData['pj_iot_smoke_statistics']['params'],function(ret){
            if(ret['data']){
            	var series = new Array();
            	var data = new Array();
                data['xAxis_data'] = ret['data']['time'];
                series = [
					{
						name: '警情次数',
						data: ret['data']['value'],
						type: 'line',
					}
				];
				data['series_data'] = series;
				data['smooth'] = 2;
				
            }else {
            	var series = new Array();
            	var data = new Array();
                data['xAxis_data'] = ['暂无数据'];
                series = [
					{
						name: '警情次数',
						data: [0],
						type: 'line',
					}
				];
				data['series_data'] = series;
				data['smooth'] = 2;
            }
            line_chart('smoke_line_chart',data);
        },'json'); 
    }

    //获取混凝土仪器编号
    function update_pj_concrete_serialnum() {
        $('#iot_concrete').html('');
        $.ajax({
            url : java_smart_screen +"concreteData/getSerialNum",
            type : "get",
            data : {
                "orgId":postData['access_org_id']
            },
            async : false,
            dataType : "json",
            contentType: "application/json",
            success : function(ret){
                if(ret['code'] == 200) {
                    $.each(ret.body, function(i, con) {
                        if(i == 0) {
                            var num = i + 1;
                            var html = '<label class="active" type="1" serialNum="'+con.serialNum+'">设备'+num+'</label>';
                            $('#iot_concrete').append(html);
                        } else {
                            var num = i + 1;
                            var html = '<label>|</label><label type="2" serialNum="'+con.serialNum+'">设备'+num+'</label>';
                            $('#iot_concrete').append(html);
                        }
                    });
                }
            }
        });
    }

    //项目概况--混凝土模块
    function update_pj_concrete_statistics(){
        var type = parseInt($('.alarm .active').attr('type'));
        var serialNum = parseInt($('.alarm .active').attr('serialNum'));
        var orgId = postData['access_org_id'];
        if(type == 1 || type == 2) {
            var url = java_smart_screen +"concreteData/getData/"+orgId+"/"+serialNum;
            $.get(url, "" ,function(ret){
                if(ret['code'] == 200) {
                    var myChart = echarts.init(document.getElementById("concrete_line_chart"));
                    var option = {
                        title:{
                            text: "",
                            left: 'center',
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#26D9FF'
                                }
                            },
                            axisLabel:{
                                margin: 20,
                                textStyle: {
                                    fontSize: 14,
                                    color:'#9199A0'
                                },
                            },
                            data: ret['body']['time'],
                        },
                       /* color: ['#f0a4a2','#819de1','#79c1c8','#c1de81','#f1a48d',
                                 '#de86a9','#88e0b8','#9eda6f','#ff8c30','#ef625b',
                                 '#88ca25','#2dc7cc','#ffc21c','#ac93e4','#f1d686',
                                 '#c1de81','#8edbac','#82c9e4','#a89beb','#eba3cc'],*/
                        yAxis: {
                            name: "℃",
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#26D9FF'
                                }
                            },
                            axisLabel: {
                                margin: 20,
                                textStyle: {
                                    fontSize: 14,
                                    color:'#9199A0'
                                },
                            },
                            splitLine: {
                                show:false,
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        },
                        series: [
                            {
                                type:'line',
                                data:ret['body']['data1']
                            },
                            {
                                type:'line',
                                data:ret['body']['data2']
                            },
                            {
                                type:'line',
                                data:ret['body']['data3'],  
                            },
                            {
                                type:'line',
                                data:ret['body']['data4'],
                            },
                            {
                                type:'line',
                                data:ret['body']['data5'],   
                            },
                            {
                                type:'line',
                                data:ret['body']['data6'],  
                            },
                            {
                                type:'line',
                                data:ret['body']['data7'],  
                            },
                            {
                                type:'line',
                                data:ret['body']['data8'], 
                            },
                        ]
                    };
                    myChart.setOption(option);
                }
            },'json');
        }       
    }
    
    
    //项目概况--标养室模块
    function update_pj_soil_statistics(){
    	var type = parseInt($('.alarm .active').attr('type'));
    	if(type == 1 || type == 2) {
    		postData['pj_iot_soil_statistics']['params']['type'] = type;
    		$.post(postData['pj_iot_soil_statistics']['url'],postData['pj_iot_soil_statistics']['params'],function(ret){
	            if(ret['data']){
	            	var series = new Array();
	            	var data = new Array();
	            	var name = type == 1 ? '温度' : '湿度';
	                data['xAxis_data'] = ret['data']['x_data'];
	                series = [
						{
							name: name,
							data: ret['data']['y_data'],
							type: 'line',
						}
					];
					data['series_data'] = series;
					data['smooth'] = 2;
					
	            }else{
	            	var series = new Array();
	            	var data = new Array();
	            	var name = type == 1 ? '温度' : '湿度';
	                data['xAxis_data'] = ['暂无数据'];
	                series = [
						{
							name: name,
							data: [0],
							type: 'line',
						}
					];
					data['series_data'] = series;
					data['smooth'] = 2;
	            }
	            line_chart('soil_line_chart',data);
	        },'json');
    	}    
    }

    //物联监测-平面图监控
    function init_monitor_area(){
        // $.ajax({
        //     url: java_smart_screen+"videoMonitor/videoMonitorPoints",
        //     data: {"orgId":postData['access_org_id']},
        //     type: "GET",
        //     async:false,
        //     dataType: "json",
        //     contentType: 'application/json',
        //     success: function(ret) {
        //         if(ret['code'] == 200){
        //             var datas = ret['body'];
        //             var vm = datas['videoMonitorMapVO'];
        //             // var priority = datas['priority'];
        //             var monitor  = datas['videoMonitorPointsVOS'];
        //             if(typeof vm != 'undefined' && typeof vm['imageUrl'] != 'undefined'){
        //                 var width  = vm['width'];
        //                 var height = vm['height']; 
        //                 var bounds = [[0,0], [height,width]];
        //                 var map = L.map('map', {
        //                     crs: L.CRS.Simple,
        //                     maxZoom: 8,
        //                     minZoom: -1,
        //                     maxBounds: bounds
        //                 });
        //                 map.getContainer().style.width = '530px';
        //                 map.getContainer().style.height= '420px';
        //                 document.body.style.margin = 0;

        //                 map.fitBounds(bounds);
        //                 L.imageOverlay(vm['imageUrl'], bounds,{interactive:true}).addTo(map);
        //                 var myIcon = L.divIcon({className: 'monitor_point1'});
        //                 $.each(monitor, function(k,v){
        //                     switch(v['point_type']){
        //                         case 1:
        //                             // myIcon = L.divIcon({className: 'monitor_point1'});
        //                             myIcon = L.divIcon({className:'monitor_point1',html:'<div class="monitor_point1" title="'+v['position']+'"></div>',iconSize: [20, 20]});
        //                             break;
        //                         case 2:
        //                             // myIcon = L.divIcon({className: 'monitor_point2'});
        //                             myIcon = L.divIcon({className:'monitor_point2',html:'<div class="monitor_point2" title="'+v['position']+'"></div>',iconSize: [20, 20]});
        //                             break;
        //                         case 3:
        //                             // myIcon = L.divIcon({className: 'monitor_point3'});
        //                             myIcon = L.divIcon({className:'monitor_point3',html:'<div class="monitor_point3" title="'+v['position']+'"></div>',iconSize: [20, 20]});
        //                             break;
        //                         default:
        //                             // myIcon = L.divIcon({className: 'monitor_point1'});
        //                             myIcon = L.divIcon({className:'monitor_point1',html:'<div class="monitor_point1" title="'+v['position']+'"></div>',iconSize: [20, 20]});
        //                             break;
        //                     }
        //                     L.marker([v.lateralAxis, v.verticalAxis], {icon: myIcon}).addTo(map).on(
        //                         'click',
        //                         (function (v) {
        //                             console.log(v)
        //                             return function(){
        //                                 if(v['videoType'] == 1){
        //                                     var html = template('tmpl_video', { id: 'video_' + v['id'], url: v['url'] });
        //                                     layer.open({
        //                                         type: 1,
        //                                         title: false,
        //                                         closeBtn: 0,
        //                                         area: ['600px', '305px'],
        //                                         shadeClose: false,
        //                                         skin: 'layui-layer-nobg',
        //                                         content: html,
        //                                         success: function (layero, index) {
        //                                             init_video('video_' + v['id']);
        //                                         }
        //                                     });
        //                                 }else if(v['videoType'] == 2){
        //                                     article_add2('',v['url']+'?code='+v['code'],'620px','490px');
        //                                     $('.layui-layer-content').css({
        //                                         'overflow' : 'hidden',
        //                                     });
        //                                     $('.layui-layer-title').css({
        //                                         'background-color':'rgba(0,0,0,0.8)',
        //                                         'border':0,
        //                                         'height':'20px',
        //                                     });
        //                                     $('.iframe').css({
        //                                         'overflow' : 'hidden',
        //                                     });
        //                                     $('.layui-layer-load').css({
        //                                         'background-color'      : 'rgba(0,0,0,0.8)',
        //                                         'background-image'      : 'url()',
        //                                     });
        //                                 }
        //                             };      
        //                         })(v)
        //                     )
        //                 });
        //             }
        //         }
        //     }
        // })
        $.post(postData['pj_iot_video_monitoring']['url'],postData['pj_iot_video_monitoring']['params'],function(ret){
            console.log(ret)
            if(ret['code'] == 0){
                var datas = ret['data'];
                var vm = datas['image'];
                var priority = datas['priority'];
                var monitor  = datas['monitor'];

                if(typeof vm != 'undefined' && typeof vm['url'] != 'undefined'){
                    if(priority == 'width'){
                        var width   = 530;
                        var rate = width / vm['width'];
                        var height  = rate * vm['height'];
                    }else{
                        var width  = vm['width'];
                        var height = vm['height']; 
                    } 
                    var bounds = [[0,0], [height,width]];
                    var map = L.map('map', {
                        crs: L.CRS.Simple,
                        maxZoom: 8,
                        minZoom: -1,
                        maxBounds: bounds
                    });
                    map.getContainer().style.width = '530px';
                    map.getContainer().style.height= '420px';
                    document.body.style.margin = 0;

                    map.fitBounds(bounds);
                    L.imageOverlay(vm['url'], bounds,{interactive:true}).addTo(map);
                    var myIcon = L.divIcon({className: 'monitor_point1'});
                    $.each(monitor, function(k,v){
                        switch(v['point_type']){
                            case 1:
                                // myIcon = L.divIcon({className: 'monitor_point1'});
                                myIcon = L.divIcon({className:'monitor_point1',html:'<div class="monitor_point1" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                                break;
                            case 2:
                                // myIcon = L.divIcon({className: 'monitor_point2'});
                                myIcon = L.divIcon({className:'monitor_point2',html:'<div class="monitor_point2" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                                break;
                            case 3:
                                // myIcon = L.divIcon({className: 'monitor_point3'});
                                myIcon = L.divIcon({className:'monitor_point3',html:'<div class="monitor_point3" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                                break;
                            default:
                                // myIcon = L.divIcon({className: 'monitor_point1'});
                                myIcon = L.divIcon({className:'monitor_point1',html:'<div class="monitor_point1" title="'+v['position']+'"></div>',iconSize: [20, 20]});
                                break;
                        }
                        var lateralAxis;
                        var verticalAxis;
                        if(priority == 'width'){
                            lateralAxis = v.point[0];
                            verticalAxis =v.point[1];
                        }else{
                            lateralAxis = v.point[0];
                            verticalAxis =v.point[1];
                        } 
                        L.marker([lateralAxis, verticalAxis], {icon: myIcon}).addTo(map).on(
                            'click',
                            (function (v) {
                                return function(){
                                    if(v['video_type'] == 1){
                                        var html = template('tmpl_video', { id: 'video_' + v['id'], url: v['url'] });
                                        layer.open({
                                            type: 1,
                                            title: false,
                                            closeBtn: 0,
                                            area: ['600px', '305px'],
                                            shadeClose: false,
                                            skin: 'layui-layer-nobg',
                                            content: html,
                                            success: function (layero, index) {
                                                init_video('video_' + v['id']);
                                            }
                                        });
                                    }else if(v['video_type'] == 2){
                                        article_add2('',v['url']+'?code='+v['code'],'620px','490px');
                                        $('.layui-layer-content').css({
                                            'overflow' : 'hidden',
                                        });
                                        $('.layui-layer-title').css({
                                            'background-color':'rgba(0,0,0,0.8)',
                                            'border':0,
                                            'height':'20px',
                                        });
                                        $('.iframe').css({
                                            'overflow' : 'hidden',
                                        });
                                        $('.layui-layer-load').css({
                                            'background-color'      : 'rgba(0,0,0,0.8)',
                                            'background-image'      : 'url()',
                                        });
                                    }
                                };      
                            })(v)
                        )
                    });
                    
                } else {
                    L.imageOverlay('/Admin/image/no-image.png', bounds,{interactive:true}).addTo(map);
                }
            }
        },'json');
    }

    if($('#pj_iot_environment_monitoring').length > 0){
        update_iot_environmental_monitoring();
        window.setInterval(update_iot_environmental_monitoring,1000*60*32); 
    } 
    if($('#pj_iot_staff_monitoring').length > 0){
        update_pj_people_dynamic();
        window.setInterval(update_pj_people_dynamic,1000*60*32); 
    } 
    //水电监测
    if($('#pj_iot_elec_monitoring').length > 0){
        update_pj_water_or_watt_statistics();
        window.setInterval(update_pj_water_or_watt_statistics,1000*60*32); 
    } 
    //喷淋监测
    if($('#pj_iot_spray_monitoring').length > 0){
        update_pj_spray_statistics();
        window.setInterval(update_pj_spray_statistics,1000*60*32);
    } 
    //烟雾感应监测
    if($('#pj_iot_smoke_monitoring').length > 0){
        update_pj_smoke_statistics();
        window.setInterval(update_pj_smoke_statistics,1000*60*32); 
    } 
    //标养室监测
    if($('#pj_iot_soil_monitoring').length > 0){
        update_pj_soil_statistics();
        window.setInterval(update_pj_soil_statistics,1000*60*32); 
    } 
    //混凝土监测
    if($('#pj_iot_concrete_monitoring').length > 0){
        update_pj_concrete_serialnum();
        update_pj_concrete_statistics();
        window.setInterval(update_pj_concrete_statistics,1000*60*32); 
    } 
    if($("#pj_iot_video_monitoring").length > 0){
        init_monitor_area();
        window.setInterval(init_monitor_area,1000*60*32); 
    }
    
    //切换温度、湿度图表
	$('#iot_soil').on('click', 'label', function () {
		$('#iot_soil label').removeClass('active');
		$(this).addClass('active');
		var type = parseInt($(this).attr('type'));
		if(type == 1 || type == 2)
			update_pj_soil_statistics();
	})

    //切换混凝土设备
    $('#iot_concrete').on('click', 'label', function () {
        $('#iot_concrete label').removeClass('active');
        $(this).addClass('active');
        var type = parseInt($(this).attr('type'));
        if(type == 1 || type == 2){
            update_pj_concrete_statistics();
        }
    })

    if($("#pj_iot_video_monitoring").length > 0){
        $("body").delegate("#monitor_video_elastic_layer_body .type_select li", "click", function(){
            $("#monitor_video_elastic_layer_body .page_num").html(1);
            $("#monitor_video_elastic_layer_body .type_select li").removeClass("selected");
            $(this).addClass("selected");
            update_monitor_video_matrix();
        });

        $("body").delegate("#monitor_video_elastic_layer_body .matrix_select li", "click", function(){
            $("#monitor_video_elastic_layer_body .page_num").html(1);
            $("#monitor_video_elastic_layer_body .matrix_select li").removeClass("selected");
            $(this).addClass("selected");
            update_monitor_video_matrix();
        });

        $("body").delegate("#monitor_video_elastic_layer_body .previous_page", "click", function(){
            var page = parseInt($("#monitor_video_elastic_layer_body .page_num").html());
            if(page == 1){
                layer.msg("当前已是第一页！");
                return;
            }
            $("#monitor_video_elastic_layer_body .page_num").html(page - 1);
            var ret = update_monitor_video_matrix();

            if(!ret){
                $("#monitor_video_elastic_layer_body .page_num").html(page);
            }
        });

        $("body").delegate("#monitor_video_elastic_layer_body .next_page", "click", function(){
            var page = parseInt($("#monitor_video_elastic_layer_body .page_num").html());
            $("#monitor_video_elastic_layer_body .page_num").html(page + 1);
            var ret = update_monitor_video_matrix();

            if(!ret){
                $("#monitor_video_elastic_layer_body .page_num").html(page);
            }
        });
                
        //更新弹窗视频
        function update_monitor_video_matrix(){
            postData['pj_iot_video_monitoring']['layer'][1]['params']['page'] = $("#monitor_video_elastic_layer_body .page_num").html();
            postData['pj_iot_video_monitoring']['layer'][1]['params']['type'] = $("#monitor_video_elastic_layer_body .type_select .selected").attr('data-type');
            if($("#monitor_video_elastic_layer_body .matrix_select .selected").attr('data-type') == 1){
                postData['pj_iot_video_monitoring']['layer'][1]['params']['row'] = 1;
                postData['pj_iot_video_monitoring']['layer'][1]['params']['col'] = 2;
            }else if($("#monitor_video_elastic_layer_body .matrix_select .selected").attr('data-type') == 2){
                postData['pj_iot_video_monitoring']['layer'][1]['params']['row'] = 2;
                postData['pj_iot_video_monitoring']['layer'][1]['params']['col'] = 3;
            }
            postData['pj_iot_video_monitoring']['layer'][1]['params']['width'] = $("#monitor_video_elastic_layer_body").width();
            postData['pj_iot_video_monitoring']['layer'][1]['params']['height'] = $("#monitor_video_elastic_layer_body").height();

            $.post(postData['pj_iot_video_monitoring']['layer'][1]['url'],postData['pj_iot_video_monitoring']['layer'][1]['params'],function(ret){
                if(ret['code'] == 0){
                    $('#monitor_video_elastic_layer_body .page_num').html(ret['data']['page']);
                    var video_matrix  = template("monitor_video_elastic_matrix_temp", ret);
                    $('#monitor_video_elastic_layer_body .monitor_video_list').html(video_matrix); 

                    $.each( ret['data']['video'], function(i, n){
                        var temp_id = "video_" + i;
                        init_video(temp_id);
                    });

                    $("embed").css({
                        'left' : '7%',
                        'top' : '7%',
                    });
                    
                    return true;
                }else{
                    layer.msg("暂无相关数据");
                    return false;
                }
            }); 
        }

        $("#pj_iot_video_monitoring .module_name").click(function(){
            $.post(postData['pj_iot_video_monitoring']['layer'][0]['url'],postData['pj_iot_video_monitoring']['layer'][0]['params'],function(ret){
                if(ret['code'] == 0){
                    ret.code = $('#container').css("transform");
                    var video_layer  = template("monitor_video_elastic_layer_temp", ret);
                    $('body').append(video_layer);
                    update_monitor_video_matrix();
                }else{
                    layer.msg("暂无相关数据");
                }
            }); 
        });
    }
})();


//项目级-设备管理
(function () {
    var postData = JSON.parse(postDataSource);

    //设备管理--概况统计模块
    function update_pj_device_simply_statistics(){
        $.post(postData['pj_device_simply_statistics']['url'],postData['pj_device_simply_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_device_simply_statistics_temp', ret['data']);
                $('#pj_special_equipments_box').html(html_text);
                if(ret && ret['data'] && ret['data']['today_checkout_count']){
                    var data = {
                        'name' : '今日查出率',
                        'rate' : ret['data']['today_checkout_count'],
                    };   
                }else{
                    var data = {
                        'name' : '今日查出率',
                        'rate' : 0,
                    };
                }
                ring_rate_chart('today_device_checkout_rate',data);
            }
        }); 
    }

    //设备管理--设备类型及数据分布
    function update_pj_device_type_statistics(){
        $.post(postData['pj_device_type_statistics']['url'],postData['pj_device_type_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                simply_pie_chart('pj_device_type_pie_chart', ret['data']);
            }
        }); 
    }

    //设备管理--设备详情列表
    function update_pj_device_detail_info(){
        $.post(postData['pj_device_detail_info']['url'],postData['pj_device_detail_info']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_device_detail_info_list_temp', ret);
                $('#pj_device_detail_info .content_list').html(html_text);
                if(ret['data'].length > 10){
                    scroll_new_dynamic("#pj_device_detail_info .content_box",4500,2500);
                }
            }
        }); 
    }

    //设备管理--设备最新动态
    function update_pj_device_new_dynamic(){
         $.post(postData['pj_device_new_dynamic']['url'],postData['pj_device_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 5){
                    scroll_new_dynamic("#pj_device_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#pj_device_new_dynamic').length > 0){
        update_pj_device_new_dynamic();
        window.setInterval(update_pj_device_new_dynamic,1000*60*30); 
    }

    if($('#pj_device_detail_info').length > 0){
        update_pj_device_detail_info();
        window.setInterval(update_pj_device_detail_info,1000*60*30); 
    }

    if($('#pj_device_type_statistics').length > 0){
        update_pj_device_type_statistics();
        window.setInterval(update_pj_device_type_statistics,1000*60*31); 
    }

    if($('#pj_device_simply_statistics').length > 0){
        update_pj_device_simply_statistics();
        window.setInterval(update_pj_device_simply_statistics,1000*60*32); 
    }    
})();

//公司级-设备管理
(function () {
    var postData = JSON.parse(postDataSource);

    //设备管理--概况统计模块
    function update_cp_device_simply_statistics(){
        $.post(postData['cp_device_simply_statistics']['url'],postData['cp_device_simply_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_device_simply_statistics_temp', ret['data']);
                $('#cp_special_equipments_box').html(html_text);
                if(ret && ret['data'] && ret['data']['today_checkout_count']){
                    var data = {
                        'name' : '今日查出率',
                        'rate' : ret['data']['today_checkout_count'],
                    };   
                }else{
                    var data = {
                        'name' : '今日查出率',
                        'rate' : 0,
                    };
                }
                
                ring_rate_chart('today_device_checkout_rate',data);
            }
        }); 
    }

    //设备管理--设备类型及数据分布
    function update_cp_device_type_statistics(){
        $.post(postData['cp_device_type_statistics']['url'],postData['cp_device_type_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                simply_pie_chart('cp_device_type_pie_chart', ret['data']);
            }
        }); 
    }

    //设备管理--设备详情列表
    function update_cp_device_detail_info(){
        $.post(postData['cp_device_detail_info']['url'],postData['cp_device_detail_info']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_device_detail_info_list_temp', ret);
                $('#cp_device_detail_info .content_list').html(html_text);
                if(ret['data'].length > 10){
                    scroll_new_dynamic("#cp_device_detail_info .content_box",4500,2500);
                }
            }
        }); 
    }

    //设备管理--设备最新动态
    function update_cp_device_new_dynamic(){
         $.post(postData['cp_device_new_dynamic']['url'],postData['cp_device_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 5){
                    scroll_new_dynamic("#pj_new_dynamic_box #cp_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#cp_device_new_dynamic').length > 0){
        update_cp_device_new_dynamic();
        window.setInterval(update_cp_device_new_dynamic,1000*60*30); 
    }

    if($('#cp_device_detail_info').length > 0){
        update_cp_device_detail_info();
        window.setInterval(update_cp_device_detail_info,1000*60*30); 
    }

    if($('#cp_device_type_statistics').length > 0){
        update_cp_device_type_statistics();
        window.setInterval(update_cp_device_type_statistics,1000*60*31); 
    }

    if($('#cp_device_simply_statistics').length > 0){
        update_cp_device_simply_statistics();
        window.setInterval(update_cp_device_simply_statistics,1000*60*32); 
    }    
})();

//公司层级-首页处理
(function () {
    var postData = JSON.parse(postDataSource);

    //公司概况--项目统计
    function update_project_statistics(){
         $.post(postData['project_statistics']['url'],postData['project_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('project_statistics_temp', ret);
                $('#project_statistics .box_body').html(html_text);
                color_ring_rate_chart('progress_chart0', ret['data'][0]['rate'], '#26D9FF');
                color_ring_rate_chart('progress_chart1', ret['data'][1]['rate'], '#EB9B10');
                color_ring_rate_chart('progress_chart2', ret['data'][2]['rate'], '#DA701A');
                color_ring_rate_chart('progress_chart3', ret['data'][3]['rate'], '#BB3030');
                color_ring_rate_chart('progress_chart4', ret['data'][4]['rate'], '#82E344');
            }
        }); 
    }

    if($('#project_statistics').length > 0){
        update_project_statistics();
        window.setInterval(update_project_statistics,1000*60*30); 
    }

    //公司概况--最新动态
    function update_cp_new_dynamic(){
         $.post(postData['cp_new_dynamic']['url'],postData['cp_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                if(ret['data']['dynamic_list'].length > 0){
                    var html_text = template('pj_new_dynamic_temp', ret['data']);
                    $('#pj_new_dynamic_box ul').html(html_text);
                }
                if(ret['data']['dynamic_list'].length > 4){
                    scroll_new_dynamic("#cp_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($('#cp_new_dynamic').length > 0){
        update_cp_new_dynamic();
        window.setInterval(update_cp_new_dynamic,1000*60*30); 
    }

    //公司概况--安全管理
    function update_cp_safe_management(){
         $.post(postData['cp_safe_management']['url'],postData['cp_safe_management']['params'],function(ret){
            if(ret['code'] == 0){
                ret['data']['find_danger_rate'] = Math.floor(ret['data']['find_danger_rate']);
                ret['data']['reform_danger_rate'] = Math.floor(ret['data']['reform_danger_rate']);
                var html_text = template('cp_safe_management_temp', ret['data']);
                $('#cp_safe_management .box_body').html(html_text);
            }
        }); 
    }

    if($('#cp_safe_management').length > 0){
        update_cp_safe_management();
        window.setInterval(update_cp_safe_management,1000*60*30); 
    }

    //公司概况--质量管理
    function update_cp_quality_management(){
         $.post(postData['cp_quality_management']['url'],postData['cp_quality_management']['params'],function(ret){
            if(ret['code'] == 0){
                ret['data']['build_rate'] = Math.floor(ret['data']['build_rate']);
                ret['data']['problem_rate'] = Math.floor(ret['data']['problem_rate']);
                var html_text = template('cp_quality_management_temp', ret['data']);
                $('#cp_quality_management .box_body').html(html_text);
            }
        }); 
    }

    if($('#cp_quality_management').length > 0){
        update_cp_quality_management();
        window.setInterval(update_cp_quality_management,1000*60*30); 
    }

    //公司概况--设备管理
    function update_cp_device_management(){
         $.post(postData['cp_device_management']['url'],postData['cp_device_management']['params'],function(ret){
            if(ret['code'] == 0){
                ret['data']['check_rate'] = Math.floor(ret['data']['check_rate']);
                ret['data']['reform_rate'] = Math.floor(ret['data']['reform_rate']);
                var html_text = template('cp_device_management_temp', ret['data']);
                $('#cp_device_management .box_body').html(html_text);
            }
        }); 
    }

    if($('#cp_device_management').length > 0){
        update_cp_device_management();
        window.setInterval(update_cp_device_management,1000*60*30); 
    }

    //公司概况--物资管理
    function update_cp_material_management(){
         $.post(postData['cp_material_management']['url'],postData['cp_material_management']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_material_management_temp', ret['data']);
                $('#cp_material_management .box_body').html(html_text);
            }
        }); 
    }

    if($('#cp_material_management').length > 0){
        update_cp_material_management();
        window.setInterval(update_cp_material_management,1000*60*30); 
    }

    //公司概况-总项目信息-项目列表
    function update_total_project_info_list(data){
        var html_text = template('cp_total_project_info_list_temp', data);
        $('#total_project_info .box_body').html(html_text);
        if(data.data.length > 9){
            scroll_new_dynamic("#cp_total_project_info_list .content_box",4500,2500);
        }
    }

    //公司概况-总项目信息-项目地图分布
    function update_total_project_info_map(data){
        var html = "<div id='cp_total_project_info_map'></div>";
        $('#total_project_info .box_body').html(html);
        total_map_chart('cp_total_project_info_map', data);
    }

    //公司概况-总项目信息
    function update_total_project_info(){
        var postDatas = postData['total_project_info']['params'];
        var data_type = $('#total_project_info .selected_type1').attr('data-type');
        $.post(postData['total_project_info'][data_type]['url'], postDatas, function(ret){
            if(ret['code'] == 0){
                if(data_type == "list"){
                    update_total_project_info_list(ret);
                }else if(data_type == "map"){
                    if(postData['first_access'] == 1){
                        setTimeout(function(){ update_total_project_info_map(ret['data']);},3000); 
                    }else{
                        update_total_project_info_map(ret['data']);
                    }   
                }
            }
        },'json'); 
    }

    if($('#total_project_info').length > 0){
        $('#total_project_info .select_module').click(function(){
            $('#total_project_info .select_module').removeClass('selected_type1');
            $(this).addClass('selected_type1');
            update_total_project_info();
        });

        update_total_project_info();
        window.setInterval(update_total_project_info,1000*60*31); 
    }

    //公司概况-项目人员统计
    function update_cp_people_statistics(){
        $.post(postData['cp_people_statistics']['url'],postData['cp_people_statistics']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_people_statistics_temp', ret['data']);
                $('#cp_people_statistics .box_body').html(html_text);
            }
        }); 
    }

    if($('#cp_people_statistics').length > 0){
        update_cp_people_statistics();
        window.setInterval(update_cp_people_statistics,1000*60*31); 
    }


    //公司概况--重点项目
    function update_cp_key_project(){
         $.post(postData['cp_key_project']['url'],postData['cp_key_project']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('cp_key_project_temp', ret);
                $('#cp_key_project .box_body').html(html_text);
                var tmp_element = '#cp_key_project .swiper-container';
                var autoplay = ret['data'].length > 1 ? true :false;
                var hideOnClick = ret['data'].length > 1 ? false :true;
                var mySwiper = new Swiper (tmp_element, {
                    direction: 'horizontal',
                    loop: true,
                    autoplay : {
                        delay:6000
                    },
                    speed:1000,
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                      hideOnClick: hideOnClick,
                    },
                })  
            }
        }); 
    }


    if($('#cp_key_project').length > 0){
        update_cp_key_project();
        window.setInterval(update_cp_key_project,1000*60*31); 
    }

    //进度管理
    if($('#progress_management').length > 0){
        $.post(postData['progress_management']['url'],postData['progress_management']['params'],function(ret){
            if(ret['code'] == 0){
                $.each( ret['data'], function(k, v){
                    $('#'+v['name']+' .progress_bar_rate').css({
                        'width':v['width1']+'px',
                        'transition':'width 3s',
                    });
                    $('#'+v['name']+' .progress_bar_number').html(v['num']);
                    $('#'+v['name']+' .progress_bar_number').css({
                        'left':v['width2']+'px',
                        'transition':'left 3s',
                    });
                });
            }
        });
    }

    //安全管理弹层
    $(".container").delegate("#cp_safe_management", "click", function(){
        $.post(postData['cp_safe_management']['layer'][0]['url'],postData['cp_safe_management']['layer'][0]['params'],function(ret){
            if(ret['code'] == 0){
                ret.code = $('#container').css("transform");
                var table_layer  = template("cp_safe_management_layer_temp", ret);
                $('body').append(table_layer);
            }else{
                layer.msg("暂无相关数据");
            }
        });
    });

    //质量管理弹层
    $(".container").delegate("#cp_quality_management", "click", function(){
        $.post(postData['cp_quality_management']['layer'][0]['url'],postData['cp_quality_management']['layer'][0]['params'],function(ret){
            if(ret['code'] == 0){
                ret.code = $('#container').css("transform");
                var table_layer  = template("cp_quality_management_layer_temp", ret);
                $('body').append(table_layer);
            }else{
                layer.msg("暂无相关数据");
            }
        });
    });

    //项目进度弹窗
    $(".container").delegate("#progress_management .progress_box", "click", function(){
        postData['progress_management']['layer'][0]['params']['progress'] = parseInt($(this).attr("data-type"));
        if(postData['progress_management']['layer'][0]['params']['progress'] == 3){
            $.post(postData['progress_management']['layer'][1]['url'],postData['progress_management']['layer'][1]['params'],function(ret){
                if(ret['code'] == 0){
                    ret.code = $('#container').css("transform");
                    var table_layer  = template("progress_time_delay_info_temp", ret);
                    $('body').append(table_layer);
                }else{
                    layer.msg("暂无相关数据");
                }
            });
        }else{
            $.post(postData['progress_management']['layer'][0]['url'],postData['progress_management']['layer'][0]['params'],function(ret){
                if(ret['code'] == 0){
                    ret.code = $('#container').css("transform");
                    var table_layer  = template("project_statistics_layer_temp", ret);
                    $('body').append(table_layer);
                }else{
                    layer.msg("暂无相关数据");
                }
            }); 
        }      
    })

    //项目统计弹窗
    $(".container").delegate("#project_statistics .project_status_box", "click", function(){
        postData['project_statistics']['layer'][0]['params']['status'] = parseInt($(this).attr("data-type"));
        $.post(postData['project_statistics']['layer'][0]['url'],postData['project_statistics']['layer'][0]['params'],function(ret){
            if(ret['code'] == 0){
                ret.code = $('#container').css("transform");
                var table_layer  = template("project_statistics_layer_temp", ret);
                $('body').append(table_layer);
            }else{
                layer.msg("暂无相关数据");
            }
        }); 
    })

    //设备管理弹窗
    $(".container").delegate("#cp_device_management", "click", function(){
        $.post(postData['cp_device_management']['layer'][0]['url'],postData['cp_device_management']['layer'][0]['params'],function(ret){
            if(ret['code'] == 0){
                ret.code = $('#container').css("transform");
                var table_layer  = template("cp_device_management_layer_temp", ret);
                $('body').append(table_layer);
            }else{
                layer.msg("暂无相关数据");
            }
        }); 
    })

    //物资管理弹窗
    $(".container").delegate("#cp_material_management", "click", function(){
        $.post(postData['cp_material_management']['layer'][0]['url'],postData['cp_material_management']['layer'][0]['params'],function(ret){
            if(ret['code'] == 0){
                ret.code = $('#container').css("transform");
                var table_layer  = template("cp_material_management_layer_temp", ret);
                $('body').append(table_layer);
            }else{
                layer.msg("暂无相关数据");
            }
        }); 
    })

    $(".container").delegate("#cp_people_statistics", "click", function(){
        $.post(postData['cp_people_statistics']['layer'][0]['url'],postData['cp_people_statistics']['layer'][0]['params'],function(ret){
            if(ret['code'] == 0){
                ret.code = $('#container').css("transform");
                var table_layer  = template("cp_people_statistics_layer_temp", ret);
                $('body').append(table_layer);
            }else{
                layer.msg("暂无相关数据");
            }
        }); 
    })

})();


//公司级-BIM建造
(function () {
    var postData = JSON.parse(postDataSource);

    var bim_video_list = new Array();

    var model_is_load = 0;
    var video_is_load = 0;

    //项目选择
    if($('.select_org').length > 0){
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: false,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: ""
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode) {   
                    var postData = {org_id:treeNode.id};
                    select_org_id = treeNode.id;
                    $(".select_org span").html(treeNode.name);
                    $(".select_org span").attr('data-id',treeNode.id);
                    $('.select_org_list').css('display','none');

                    model_is_load = 0;
                    video_is_load = 0;

                    if($('#cp_bim_model').length > 0 && $('.selected_button').attr('data-type') == 2){
                        update_cp_bim_model();
                    }

                    if($('#cp_bim_video').length > 0 && $('.selected_button').attr('data-type') == 1){
                        update_cp_bim_video();
                    }
                }
            }
        };

        var t1 = $("#can_orgs");
        t1 = $.fn.zTree.init(t1, setting, zNodes);
        t1.expandNode();

        $('#can_orgs .ico_open').remove();
        $('#can_orgs .ico_close').remove();
        $('#can_orgs .ico_docu').remove();

        var flag = 0;
        $('.select_org').click(function(){
            $('.select_org_list').css('display','none');
            if(flag == 0){
                $('.select_org_list').css('display','block');
                flag = 1;  
            }else{
                 $('.select_org_list').css('display','none');
                flag = 0;  
            }
        });
    }

    $(".container").delegate("#cp_bim_big_box .ready_video_box", "click", function(){
        $(".ready_video_box").removeClass("select_video_box");
        $(this).addClass("select_video_box");
        var key = $(this).attr("data-key");
        var tmp_data = {
            "data" : bim_video_list[key]['HardwareMonitorVideo'],
        }
        var html_text = template('show_video_box_temp', tmp_data);
        $('.show_video_box').html(html_text);
    });

     $('#cp_bim_big_box .select_button').click(function(){
        $('#cp_bim_big_box .select_button').removeClass('selected_button');
        $(this).addClass('selected_button');
        if($('#cp_bim_model').length > 0 && $('.selected_button').attr('data-type') == 2){
            update_cp_bim_model();
        }
        if($('#cp_bim_video').length > 0 && $('.selected_button').attr('data-type') == 1){
            update_cp_bim_video();
        }
    });

    //BIM建造--BIM预览
    function update_cp_bim_model(){
        var select_org_id = $('.select_org span').attr('data-id');
        var postDatas = postData['cp_bim_model']['params'];
        postDatas.select_org_id = select_org_id;
        $(".content_body").css("display","none");
        $("#cp_bim_model").css("display","block");
        if(model_is_load == 0){
            $.post(postData['cp_bim_model']['url'], postDatas, function(ret){
                if(ret['code'] == 0){            
                    getViewToken(ret['data']);      
                }
            },'json'); 
            model_is_load = 1;
        } 
    }

    //BIM建造--模型漫游
    function update_cp_bim_video(){
        var select_org_id = $('.select_org span').attr('data-id');
        var postDatas = postData['cp_bim_video']['params'];
        postDatas.select_org_id = select_org_id;
        $(".content_body").css("display","none");
        $("#cp_bim_video").css("display","block");
        if(video_is_load == 0){
            $.post(postData['cp_bim_video']['url'], postDatas, function(ret){
                if(ret['code'] == 0){
                    var html_text = template('bim_video_temp', ret);
                    $('#cp_bim_video').html(html_text);
                    bim_video_list = ret["data"]; 
                }else{
                    $('#cp_bim_video').html("");
                }
            },'json'); 
            video_is_load = 1;
        }
    }

    if($('#cp_bim_model').length > 0 && $('.selected_button').attr('data-type') == 2){
        update_cp_bim_model();
    }

    if($('#cp_bim_video').length > 0 && $('.selected_button').attr('data-type') == 1){
        update_cp_bim_video();
    }
  
})();

//项目级-BIM建造
(function () {
    var postData = JSON.parse(postDataSource);

    var bim_video_list = new Array();

    var model_is_load = 0;
    var video_is_load = 0;

    $(".container").delegate("#pj_bim_big_box .ready_video_box", "click", function(){
        $(".ready_video_box").removeClass("select_video_box");
        $(this).addClass("select_video_box");
        var key = $(this).attr("data-key");
        var tmp_data = {
            "data" : bim_video_list[key]['HardwareMonitorVideo'],
        }
        var html_text = template('show_video_box_temp', tmp_data);
        $('.show_video_box').html(html_text);
    });

     $('#pj_bim_big_box .select_button').click(function(){
        $('#pj_bim_big_box .select_button').removeClass('selected_button');
        $(this).addClass('selected_button');
        if($('#pj_bim_model').length > 0 && $('.selected_button').attr('data-type') == 2){
            update_pj_bim_model();
        }
        if($('#pj_bim_video').length > 0 && $('.selected_button').attr('data-type') == 1){
            update_pj_bim_video();
        }
    });

    //BIM建造--BIM预览
    function update_pj_bim_model(){
        var postDatas = postData['pj_bim_model']['params'];
        $(".content_body").css("display","none");
        $("#pj_bim_model").css("display","block");
        if(model_is_load == 0){
            $.post(postData['pj_bim_model']['url'], postDatas, function(ret){
                if(ret['code'] == 0){            
                    getViewToken(ret['data']);      
                }
            },'json'); 
            model_is_load = 1;
        } 
    }

    //BIM建造--模型漫游
    function update_pj_bim_video(){
        var postDatas = postData['pj_bim_video']['params'];
        $(".content_body").css("display","none");
        $("#pj_bim_video").css("display","block");
        if(video_is_load == 0){
            $.post(postData['pj_bim_video']['url'], postDatas, function(ret){
                if(ret['code'] == 0){
                    var html_text = template('bim_video_temp', ret);
                    $('#pj_bim_video').html(html_text);
                    bim_video_list = ret["data"]; 
                }else{
                    $('#pj_bim_video').html("");
                }
            },'json'); 
            video_is_load = 1;
        }
    }

    if($('#pj_bim_model').length > 0 && $('.selected_button').attr('data-type') == 2){
        update_pj_bim_model();
    }

    if($('#pj_bim_video').length > 0 && $('.selected_button').attr('data-type') == 1){
        update_pj_bim_video();
    }
  
})();

//公司级-物资管理（地磅）
(function () {
    var postData = JSON.parse(postDataSource);

    //物资管理-收料概况
    function update_cp_weighbridge_receive_overview(){
        $.post(postData['cp_weighbridge_receive_overview']['url'],postData['cp_weighbridge_receive_overview']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('weighbridge_receive_overview_temp', ret['data']);
                $('#cp_weighbridge_receive_overview .box_body').html(html_text);
            }
        }); 
    }

    if($("#cp_weighbridge_receive_overview").length > 0){
        update_cp_weighbridge_receive_overview();
    }

    //物资管理-供方偏差
    function update_cp_weighbridge_supply_deviation(){
        $.post(postData['cp_weighbridge_supply_deviation']['url'],postData['cp_weighbridge_supply_deviation']['params'],function(ret){
            if(ret['code'] == 0){
                simply_pie_chart2('cp_weighbridge_supply_deviation_pie_chart', ret['data']);
            }
        }); 
    }

    if($("#cp_weighbridge_supply_deviation").length > 0){
        update_cp_weighbridge_supply_deviation();
    }

    //物资管理-收料统计
    function update_cp_weighbridge_receive_statistics(){
        var postDatas = postData['cp_weighbridge_receive_statistics']['params'];
        postDatas['time_type'] = $('#cp_weighbridge_receive_statistics .selected_button').attr('data-type');
        $.post(postData['cp_weighbridge_receive_statistics']['url'],postDatas,function(ret){
            if(ret['code'] == 0){
                bar_double_chart('cp_weighbridge_receive_statistics_bar_chart', ret['data']);
            }
        }); 
    }

    if($("#cp_weighbridge_receive_statistics").length > 0){
        $('#cp_weighbridge_receive_statistics .select_button').click(function(){
            $('#cp_weighbridge_receive_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_cp_weighbridge_receive_statistics();
        });
        update_cp_weighbridge_receive_statistics();
    }

    //物资管理-最新动态
    function update_cp_weighbridge_new_dynamic(){
        $.post(postData['cp_weighbridge_new_dynamic']['url'],postData['cp_weighbridge_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_new_dynamic_box_temp', ret);
                $('#pj_new_dynamic_box').html(html_text);
                if(ret['data'].length > 3){
                    scroll_new_dynamic("#cp_weighbridge_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($("#cp_weighbridge_new_dynamic").length > 0){
        update_cp_weighbridge_new_dynamic();
    }


    function update_cp_weighbridge_total_overnegative_rate(){
        $.post(postData['cp_weighbridge_total_overnegative_rate']['url'],postData['cp_weighbridge_total_overnegative_rate']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('subcontract_overnegative_rate_list_temp', ret);
                $('#cp_weighbridge_total_overnegative_rate .content_box ul').html(html_text);
                if(ret['data'].length > 6){
                    scroll_new_dynamic("#cp_weighbridge_total_overnegative_rate .content_box",4500,2500);
                }
            }
        }); 
    }

    if($("#cp_weighbridge_total_overnegative_rate").length > 0){
        update_cp_weighbridge_total_overnegative_rate();
    }
    
})();

//项目级-物资管理（地磅）
(function () {
    var postData = JSON.parse(postDataSource);

    //物资管理-收料概况
    function update_pj_weighbridge_receive_overview(){
        $.post(postData['pj_weighbridge_receive_overview']['url'],postData['pj_weighbridge_receive_overview']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('weighbridge_receive_overview_temp', ret['data']);
                $('#pj_weighbridge_receive_overview .box_body').html(html_text);
            }
        }); 
    }

    if($("#pj_weighbridge_receive_overview").length > 0){
        update_pj_weighbridge_receive_overview();
    }

    //物资管理-供方偏差
    function update_pj_weighbridge_supply_deviation(){
        $.post(postData['pj_weighbridge_supply_deviation']['url'],postData['pj_weighbridge_supply_deviation']['params'],function(ret){
            if(ret['code'] == 0){
                simply_pie_chart2('pj_weighbridge_supply_deviation_pie_chart', ret['data']);
            }
        }); 
    }

    if($("#pj_weighbridge_supply_deviation").length > 0){
        update_pj_weighbridge_supply_deviation();
    }

    //物资管理-收料统计
    function update_pj_weighbridge_receive_statistics(){
        var postDatas = postData['pj_weighbridge_receive_statistics']['params'];
        postDatas['time_type'] = $('#pj_weighbridge_receive_statistics .selected_button').attr('data-type');
        $.post(postData['pj_weighbridge_receive_statistics']['url'],postDatas,function(ret){
            if(ret['code'] == 0){
                bar_double_chart('pj_weighbridge_receive_statistics_bar_chart', ret['data']);
            }
        }); 
    }

    if($("#pj_weighbridge_receive_statistics").length > 0){
        $('#pj_weighbridge_receive_statistics .select_button').click(function(){
            $('#pj_weighbridge_receive_statistics .select_button').removeClass('selected_button');
            $(this).addClass('selected_button');
            update_pj_weighbridge_receive_statistics();
        });
        update_pj_weighbridge_receive_statistics();
    }

    //物资管理-最新动态
    function update_pj_weighbridge_new_dynamic(){
        $.post(postData['pj_weighbridge_new_dynamic']['url'],postData['pj_weighbridge_new_dynamic']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('pj_new_dynamic_box_temp', ret);
                $('#pj_new_dynamic_box').html(html_text);
                if(ret['data'].length > 3){
                    scroll_new_dynamic("#pj_weighbridge_new_dynamic #pj_new_dynamic_box",4500,2500);
                }
            }
        }); 
    }

    if($("#pj_weighbridge_new_dynamic").length > 0){
        update_pj_weighbridge_new_dynamic();
    }


    function update_pj_weighbridge_total_overnegative_rate(){
        $.post(postData['pj_weighbridge_total_overnegative_rate']['url'],postData['pj_weighbridge_total_overnegative_rate']['params'],function(ret){
            if(ret['code'] == 0){
                var html_text = template('subcontract_overnegative_rate_list_temp', ret);
                $('#pj_weighbridge_total_overnegative_rate .content_box ul').html(html_text);
                if(ret['data'].length > 6){
                    scroll_new_dynamic("#pj_weighbridge_total_overnegative_rate .content_box",4500,2500);
                }
            }
        }); 
    }

    if($("#pj_weighbridge_total_overnegative_rate").length > 0){
        update_pj_weighbridge_total_overnegative_rate();
    }
    
})();