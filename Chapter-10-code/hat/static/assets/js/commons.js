/*表单信息异步传输*/
function info_ajax(id, url) {
    var data = $(id).serializeJSON();
    if (id === '#add_task') {
        var include = [];
        var i = 0;
        $("ul#pre_case li a").each(function () {
            include[i++] = [$(this).attr('id'), $(this).text()];
        });
        data['module'] = include;
    }

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            if (data.indexOf('/httpapitest/') !== -1) {
                    window.location.href = data;
            } else {
                    myAlert(data);
            }    
        }
        ,
        error: function () {
            myAlert('Sorry，服务器可能开小差啦, 请重试!');
        }
    });

}


/*提示 弹出*/
function myAlert(data) {
    $('#my-alert_print').text(data);
    $('#my-alert').modal({
        relatedTarget: this
    });
}

function update_data_ajax(id, url) {
    var data = $(id).serializeJSON();
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            if (data.indexOf('/httpapitest/') !== -1) {
                    window.location.href = data;
            } else {
                    myAlert(data);
            }    
        }
        ,
        error: function () {
            myAlert('Sorry，服务器可能开小差啦, 请重试!');
        }
    });
}

function del_data_ajax(id, url) {
    var data = {
        "id": id
    };
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            if (data.indexOf('/httpapitest/') !== -1) {
                    window.location.href = data;
            } else {
                    myAlert(data);
            }    
        }
        ,
        error: function () {
            myAlert('Sorry，服务器可能开小差啦, 请重试!');
        }
    });
}


function auto_load(id, url, target, type) {
    var data = $(id).serializeJSON();
    if (id === '#pro_filter') {
        data = {
            "test": {
                "name": data,
                "type": type
            }
        }
    } else if (id === '#form_config') {
        data = {
            "config": {
                "name": data,
                "type": type
            }
        }
    } else if (id === '#belong_message' || id === '#form_message') {
        data = {
            "case": {
                "name": data,
                "type": type
            }
        }
    } else if (id === '#upload_project_info'){
        data = {
            "upload": {
                "name": data,
                "type": type
            }
        }
    } else if (id ==='#project') {
        data = {
            "crontab": {
                "name": data,
                "type": type
            }
        }
    }
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
        
                show_module(data, target)
        }
        ,
        error: function () {
            myAlert('Sorry，服务器可能开小差啦, 请重试!');
        }
    });

}

function show_module(module_info, id) {
    module_info = module_info.split('replaceFlag');
    var a = $(id);
    a.empty();
    for (var i = 0; i < module_info.length; i++) {
        if (module_info[i] !== "") {
            var value = module_info[i].split('^=');
            a.prepend("<option value='" + value[0] + "' >" + value[1] + "</option>")
        }
    }
    a.prepend("<option value='请选择' selected>请选择</option>");

}