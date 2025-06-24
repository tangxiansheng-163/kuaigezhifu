const fs = require('fs');
const path = require('path');

// 页面配置
const pages = [
    {
        filename: 'admin.html',
        title: '管理员管理',
        menuItem: '管理员管理',
        content: `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
                        <h1>管理员管理</h1>
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            新增管理员
                        </button>
                    </div>
                    
                    <div class="desc">管理企业所有管理员账号及其权限分配</div>
                    
                    <!-- 管理员列表 -->
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">张三</div>
                                <div class="card-icon purple">
                                    <i class="fas fa-user-shield"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>角色：</strong>超级管理员
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>手机号：</strong>13800000001
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#28a745;">启用</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">重置密码</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">李四</div>
                                <div class="card-icon blue">
                                    <i class="fas fa-user-shield"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>角色：</strong>企业管理员
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>手机号：</strong>13800000002
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#28a745;">启用</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">重置密码</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">王五</div>
                                <div class="card-icon green">
                                    <i class="fas fa-user-shield"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>角色：</strong>企业管理员
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>手机号：</strong>13800000003
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#fd7e14;">禁用</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">重置密码</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    },
    {
        filename: 'system-config.html',
        title: '系统配置',
        menuItem: '系统配置',
        content: `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
                        <h1>系统配置</h1>
                        <button class="btn btn-primary">
                            <i class="fas fa-cogs"></i>
                            修改配置
                        </button>
                    </div>
                    
                    <div class="desc">管理平台的全局系统参数、通知设置等配置项</div>
                    
                    <!-- 配置项 -->
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">基础参数</div>
                                <div class="card-icon purple">
                                    <i class="fas fa-cogs"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>平台名称：</strong>快哥智服平台
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>版本号：</strong>v2.0.0
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>默认语言：</strong>简体中文
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>时区：</strong>Asia/Shanghai
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">通知设置</div>
                                <div class="card-icon blue">
                                    <i class="fas fa-bell"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>系统消息推送：</strong>开启
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>邮件通知：</strong>开启
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>短信通知：</strong>关闭
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>紧急告警：</strong>开启
                                </div>
                            </div>
                        </div>
                    </div>`
    },
    {
        filename: 'system-cache.html',
        title: '系统缓存',
        menuItem: '系统缓存',
        content: `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
                        <h1>系统缓存</h1>
                        <button class="btn btn-primary">
                            <i class="fas fa-database"></i>
                            清理缓存
                        </button>
                    </div>
                    
                    <div class="desc">管理和清理平台运行过程中产生的缓存数据</div>
                    
                    <!-- 缓存信息 -->
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">缓存统计</div>
                                <div class="card-icon purple">
                                    <i class="fas fa-database"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>总缓存条目：</strong>1,234
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>占用空间：</strong>56.7MB
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>最后清理时间：</strong>2024-05-31 18:00:00
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">缓存类型</div>
                                <div class="card-icon blue">
                                    <i class="fas fa-layer-group"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <ul style="padding-left:20px;">
                                    <li>页面缓存：456条</li>
                                    <li>接口缓存：321条</li>
                                    <li>图片缓存：123条</li>
                                    <li>临时文件：334条</li>
                                </ul>
                            </div>
                        </div>
                    </div>`
    },
    {
        filename: 'position.html',
        title: '岗位管理',
        menuItem: '岗位管理',
        content: `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
                        <h1>岗位管理</h1>
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            新增岗位
                        </button>
                    </div>
                    
                    <div class="desc">管理企业内各岗位信息，包括岗位职责、权限配置和人员分配</div>
                    
                    <!-- 岗位列表 -->
                    <div class="dashboard-grid">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">技术工程师</div>
                                <div class="card-icon purple">
                                    <i class="fas fa-code"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>在职人数：</strong>45人
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>空缺岗位：</strong>3个
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#28a745;">招聘中</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">查看详情</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">运营专员</div>
                                <div class="card-icon blue">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>在职人数：</strong>38人
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>空缺岗位：</strong>2个
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#28a745;">招聘中</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">查看详情</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">销售代表</div>
                                <div class="card-icon green">
                                    <i class="fas fa-handshake"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>在职人数：</strong>32人
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>空缺岗位：</strong>5个
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#28a745;">招聘中</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">查看详情</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card">
                            <div class="card-header">
                                <div class="card-title">客服专员</div>
                                <div class="card-icon orange">
                                    <i class="fas fa-headset"></i>
                                </div>
                            </div>
                            <div class="card-content">
                                <div style="margin-bottom:15px;">
                                    <strong>在职人数：</strong>41人
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>空缺岗位：</strong>1个
                                </div>
                                <div style="margin-bottom:15px;">
                                    <strong>状态：</strong><span style="color:#28a745;">招聘中</span>
                                </div>
                                <div class="position-actions">
                                    <button class="btn btn-outline">编辑</button>
                                    <button class="btn btn-secondary">查看详情</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    }
];

// 生成HTML模板
function generateHTML(page) {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} - 快哥智服平台</title>
    <link rel="stylesheet" href="../styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
            height: 100vh;
            overflow: hidden;
        }

        .layout {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        /* 头部样式 */
        .header {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            color: white;
            padding: 0 32px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 40px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.2rem;
            font-weight: bold;
        }

        .logo i {
            color: #ffd700;
        }

        .space-switcher {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: 40px;
        }

        .space-btn {
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            padding: 8px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .space-btn:hover {
            background: rgba(255,255,255,0.2);
        }

        .space-btn.active {
            background: rgba(255,255,255,0.3);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 18px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
            cursor: pointer;
        }

        .user-avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
        }

        .user-dropdown {
            display: none;
            position: absolute;
            top: 45px;
            right: 0;
            min-width: 140px;
            background: #fff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            border-radius: 8px;
            z-index: 1001;
            padding: 8px 0;
            flex-direction: column;
        }

        .dropdown-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 18px;
            color: #495057;
            text-decoration: none;
            font-size: 0.98rem;
            transition: background 0.2s, color 0.2s;
        }

        .dropdown-item:hover {
            background: #f0f4ff;
            color: #667eea;
        }

        .user-info:hover .user-dropdown {
            display: flex;
        }

        .header-btn {
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            padding: 8px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.95rem;
            transition: background 0.3s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .header-btn:hover {
            background: rgba(255,255,255,0.2);
        }

        /* 主体区域 */
        .main-container {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        /* 左侧菜单 */
        .sidebar {
            width: 250px;
            background: white;
            border-right: 1px solid #e9ecef;
            overflow-y: auto;
            box-shadow: 2px 0 10px rgba(0,0,0,0.05);
        }

        .menu-section {
            padding: 20px 0;
        }

        .menu-title {
            padding: 0 20px 10px;
            font-size: 0.8rem;
            color: #6c757d;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            color: #495057;
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
        }

        .menu-item:hover {
            background: #f8f9fa;
            color: #764ba2;
        }

        .menu-item.active {
            background: #764ba2;
            color: white;
        }

        .menu-item i {
            width: 20px;
            text-align: center;
        }

        /* 主内容区域 */
        .content {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
            background: #f5f7fa;
        }

        .main-content { 
            max-width: 1200px !important; 
            margin: 0 auto !important; 
            background: #fff !important; 
            border-radius: 12px !important; 
            box-shadow: 0 2px 12px rgba(0,0,0,0.06) !important; 
            padding: 40px !important; 
        }
        .main-content h1 { 
            color: #764ba2 !important; 
            font-size: 1.8rem !important; 
            margin-bottom: 30px !important; 
            font-weight: 600 !important; 
        }
        .desc { 
            color: #6c757d !important; 
            font-size: 1rem !important; 
            line-height: 1.6 !important; 
            margin-bottom: 25px !important;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .dashboard-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
            border: 1px solid #e9ecef;
        }

        .dashboard-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333;
        }

        .card-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: white;
        }

        .card-icon.purple { background: #764ba2; }
        .card-icon.blue { background: #667eea; }
        .card-icon.green { background: #28a745; }
        .card-icon.orange { background: #fd7e14; }

        .card-content {
            color: #6c757d;
            line-height: 1.6;
        }

        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-primary {
            background: #764ba2;
            color: white;
        }

        .btn-primary:hover {
            background: #663d8a;
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background: #5a6268;
        }

        .btn-outline {
            background: transparent;
            color: #764ba2;
            border: 1px solid #764ba2;
        }

        .btn-outline:hover {
            background: #764ba2;
            color: white;
        }

        .position-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .space-switcher {
                display: none;
            }
            
            .sidebar {
                position: fixed;
                left: -250px;
                top: 60px;
                height: calc(100vh - 60px);
                z-index: 999;
                transition: left 0.3s;
            }

            .sidebar.open {
                left: 0;
            }

            .content {
                padding: 20px;
            }

            .dashboard-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="layout">
        <!-- 头部 -->
        <header class="header">
            <div class="header-left">
                <div class="logo">
                    <i class="fas fa-cogs"></i>
                    <span>快哥智服</span>
                </div>
                <div class="space-switcher">
                    <button class="space-btn" onclick="location.href='../personal/index.html'">
                        <i class="fas fa-user"></i>
                        个人空间
                    </button>
                    <button class="space-btn active" onclick="location.href='index.html'">
                        <i class="fas fa-building"></i>
                        企业空间
                    </button>
                    <button class="space-btn" onclick="location.href='../dashboard/index.html'">
                        <i class="fas fa-tachometer-alt"></i>
                        操作台
                    </button>
                </div>
            </div>
            <div class="header-right">
                <div class="user-info user-dropdown-trigger">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span>张三</span>
                    <div class="user-dropdown">
                        <a href="#" class="dropdown-item"><i class="fas fa-user-edit"></i> 个人资料</a>
                        <a href="#" class="dropdown-item"><i class="fas fa-key"></i> 密码重置</a>
                        <a href="#" class="dropdown-item"><i class="fas fa-shield-alt"></i> 安全设置</a>
                    </div>
                </div>
                <button class="header-btn">
                    <i class="fas fa-bell"></i>
                    消息
                </button>
                <button class="header-btn">
                    <i class="fas fa-cog"></i>
                    设置
                </button>
                <button class="header-btn" onclick="location.href='../index.html'">
                    <i class="fas fa-sign-out-alt"></i>
                    退出
                </button>
            </div>
        </header>

        <!-- 主体区域 -->
        <div class="main-container">
            <!-- 左侧菜单 -->
            <nav class="sidebar">
                <div class="menu-section">
                    <div class="menu-title">企业管理</div>
                    <div class="menu-item" onclick="location.href='overview.html'">
                        <i class="fas fa-home"></i>
                        <span>企业概览</span>
                    </div>
                    <div class="menu-item" onclick="location.href='staff.html'">
                        <i class="fas fa-users-cog"></i>
                        <span>员工管理</span>
                    </div>
                    <div class="menu-item" onclick="location.href='staff-review.html'">
                        <i class="fas fa-user-check"></i>
                        <span>员工审核</span>
                    </div>
                    <div class="menu-item" onclick="location.href='org-structure.html'">
                        <i class="fas fa-sitemap"></i>
                        <span>组织结构</span>
                    </div>
                    <div class="menu-item" onclick="location.href='position.html'">
                        <i class="fas fa-briefcase"></i>
                        <span>岗位管理</span>
                    </div>
                    <div class="menu-item" onclick="location.href='company-info.html'">
                        <i class="fas fa-building"></i>
                        <span>企业资料</span>
                    </div>
                </div>

                <div class="menu-section">
                    <div class="menu-title">角色管理</div>
                    <div class="menu-item" onclick="location.href='role-list.html'">
                        <i class="fas fa-user-tag"></i>
                        <span>角色列表</span>
                    </div>
                    <div class="menu-item" onclick="location.href='permission.html'">
                        <i class="fas fa-shield-alt"></i>
                        <span>权限管理</span>
                    </div>
                </div>

                <div class="menu-section">
                    <div class="menu-title">合作企业</div>
                    <div class="menu-item" onclick="location.href='after-sale.html'">
                        <i class="fas fa-headset"></i>
                        <span>售后企业</span>
                    </div>
                    <div class="menu-item" onclick="location.href='maintenance-company.html'">
                        <i class="fas fa-tools"></i>
                        <span>维保企业</span>
                    </div>
                </div>

                <div class="menu-section">
                    <div class="menu-title">资质认证</div>
                    <div class="menu-item" onclick="location.href='user-company.html'">
                        <i class="fas fa-industry"></i>
                        <span>设备使用商</span>
                    </div>
                    <div class="menu-item" onclick="location.href='manufacturer.html'">
                        <i class="fas fa-cogs"></i>
                        <span>设备厂商</span>
                    </div>
                    <div class="menu-item" onclick="location.href='maintenance-provider.html'">
                        <i class="fas fa-wrench"></i>
                        <span>维保服务商</span>
                    </div>
                    <div class="menu-item" onclick="location.href='auth-shop.html'">
                        <i class="fas fa-store-alt"></i>
                        <span>商家认证</span>
                    </div>
                </div>

                <div class="menu-section">
                    <div class="menu-title">企业管理员</div>
                    <div class="menu-item" onclick="location.href='admin.html'">
                        <i class="fas fa-user-shield"></i>
                        <span>管理员管理</span>
                    </div>
                </div>

                <div class="menu-section">
                    <div class="menu-title">系统设置</div>
                    <div class="menu-item" onclick="location.href='system-config.html'">
                        <i class="fas fa-cogs"></i>
                        <span>系统配置</span>
                    </div>
                    <div class="menu-item" onclick="location.href='system-log.html'">
                        <i class="fas fa-file-alt"></i>
                        <span>系统日志</span>
                    </div>
                    <div class="menu-item" onclick="location.href='system-cache.html'">
                        <i class="fas fa-database"></i>
                        <span>系统缓存</span>
                    </div>
                    <div class="menu-item" onclick="location.href='system-icon.html'">
                        <i class="fas fa-images"></i>
                        <span>系统图标</span>
                    </div>
                </div>
            </nav>

            <!-- 主内容区域 -->
            <main class="content">
                <!-- ${page.title} -->
                <div class="main-content">
                    ${page.content}
                </div>
            </main>
        </div>
    </div>
</body>
</html>`;
}

// 生成所有页面
pages.forEach(page => {
    const html = generateHTML(page);
    fs.writeFileSync(path.join(__dirname, page.filename), html, 'utf8');
    console.log(`已修复页面: ${page.filename}`);
});

console.log('所有页面修复完成！'); 