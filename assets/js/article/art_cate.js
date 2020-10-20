$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
        //获取文章分类类别
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //添加类别
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            });

        })
        // 通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            // console.log('ok')
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功！')
                        //根据索引关闭对应的弹出层
                    layer.close(
                        indexAdd
                    )
                }
            })
        })
        //编辑文章分类 因为是模版渲染出来的，也是需要用代理的，用已存在的标签进行代理
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function(res) {
            // console.log('ok')
            //弹出一个修改文章分类信息的层
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '编辑',
                content: $('#dialog-edit').html()
            });
            //attr可获取属性值
            var id = $(this).attr('data-id')
                // console.log(id)
                //发起请求获取对应分类的数据
            $.ajax({
                type: 'get',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    // console.log(res)
                    // if (res.status !== 0) return ('获取失败！')
                    form.val('form-edit', res.data)
                }

            })

        })
        //通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(
                    indexEdit
                )
                initArtCateList()
            }
        })
    })

    //通过代理的方式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            //提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            })

        });
    })

})