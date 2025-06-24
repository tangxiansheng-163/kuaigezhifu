// 批量生成企业空间页面的脚本
const fs = require('fs');
const path = require('path');

// 页面配置
const pages = [
    {
        name: 'org-structure',
        title: '组织结构',
        content: `
            <h1>组织结构</h1>
            <div class="desc">企业部门、岗位、人员的组织架构树，支持分级管理与成员查看。</div>
            <div style="background:#f8f9fa;padding:30px 20px;border-radius:10px;max-width:600px;">
                <ul style="list-style:none;padding-left:0;">
                    <li><b>总公司</b>
                        <ul>
                            <li><b>技术部</b>
                                <ul>
                                    <li>维修工程师：李四</li>
                                    <li>巡检员：王五</li>
                                </ul>
                            </li>
                            <li><b>运营部</b>
                                <ul>
                                    <li>运营专员：张三</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div style="margin-top:18px;color:#6c757d;font-size:0.95rem;">可在员工管理中调整成员归属部门与岗位。</div>
        `
    },
    {
        name: 'position',
        title: '岗位管理',
        content: `
            <h1>岗位管理</h1>
            <div class="desc">维护企业岗位体系，支持岗位增删改查与岗位描述维护。</div>
            <div class="filter-bar">
                <input type="text" placeholder="岗位名称..." style="flex:1;">
                <button class="btn-primary">搜索</button>
                <button class="btn-primary" style="background:#28a745;">新建岗位</button>
            </div>
            <table class="table-list">
                <thead>
                    <tr>
                        <th>岗位名称</th>
                        <th>岗位描述</th>
                        <th>人数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>维修工程师</td>
                        <td>负责设备维修与技术支持</td>
                        <td>12</td>
                        <td>
                            <button class="btn-link">编辑</button>
                            <button class="btn-link">删除</button>
                        </td>
                    </tr>
                    <tr>
                        <td>巡检员</td>
                        <td>负责设备巡检与报告</td>
                        <td>8</td>
                        <td>
                            <button class="btn-link">编辑</button>
                            <button class="btn-link">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top:18px;color:#6c757d;font-size:0.95rem;">岗位变更将同步影响员工岗位归属。</div>
        `
    },
    {
        name: 'role-list',
        title: '角色列表',
        content: `
            <h1>角色列表</h1>
            <div class="desc">管理企业内所有角色，支持角色权限分配、成员管理、角色增删改查等操作。</div>
            <div class="filter-bar">
                <input type="text" placeholder="角色名称/描述..." style="flex:1;">
                <button class="btn-primary">搜索</button>
                <button class="btn-primary" style="background:#28a745;">新建角色</button>
            </div>
            <table class="table-list">
                <thead>
                    <tr>
                        <th>角色名称</th>
                        <th>描述</th>
                        <th>成员数</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>企业管理员</td>
                        <td>拥有企业全部管理权限</td>
                        <td>2</td>
                        <td>2024-01-01</td>
                        <td>
                            <button class="btn-link">成员管理</button>
                            <button class="btn-link">分配权限</button>
                            <button class="btn-link">编辑</button>
                            <button class="btn-link">删除</button>
                        </td>
                    </tr>
                    <tr>
                        <td>维修主管</td>
                        <td>管理维修工单与员工</td>
                        <td>4</td>
                        <td>2024-02-15</td>
                        <td>
                            <button class="btn-link">成员管理</button>
                            <button class="btn-link">分配权限</button>
                            <button class="btn-link">编辑</button>
                            <button class="btn-link">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top:18px;color:#6c757d;font-size:0.95rem;">如需分配权限，请点击"分配权限"按钮进入权限管理页面。</div>
        `
    },
    {
        name: 'permission',
        title: '权限管理',
        content: `
            <h1>权限管理</h1>
            <div class="desc">管理系统权限配置，支持角色权限分配、权限组管理、细粒度权限控制等操作。</div>
            <div class="filter-bar">
                <input type="text" placeholder="权限名称/模块..." style="flex:1;">
                <select>
                    <option>全部模块</option>
                    <option>企业管理</option>
                    <option>工单管理</option>
                    <option>系统设置</option>
                </select>
                <button class="btn-primary">搜索</button>
                <button class="btn-primary" style="background:#28a745;">新建权限</button>
            </div>
            <table class="table-list">
                <thead>
                    <tr>
                        <th>权限名称</th>
                        <th>权限描述</th>
                        <th>所属模块</th>
                        <th>关联角色</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>员工管理</td>
                        <td>查看、编辑、删除员工信息</td>
                        <td>企业管理</td>
                        <td>企业管理员、维修主管</td>
                        <td>
                            <button class="btn-link">编辑</button>
                            <button class="btn-link">分配角色</button>
                            <button class="btn-link">删除</button>
                        </td>
                    </tr>
                    <tr>
                        <td>工单处理</td>
                        <td>创建、处理、关闭工单</td>
                        <td>工单管理</td>
                        <td>维修主管、普通员工</td>
                        <td>
                            <button class="btn-link">编辑</button>
                            <button class="btn-link">分配角色</button>
                            <button class="btn-link">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top:18px;color:#6c757d;font-size:0.95rem;">权限变更将实时生效，请谨慎操作。</div>
        `
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
        .filter-bar { 
            display: flex !important; 
            gap: 15px !important; 
            margin-bottom: 25px !important; 
            align-items: center !important; 
            padding: 20px !important; 
            background: #f8f9fa !important; 
            border-radius: 10px !important; 
        }
        .filter-bar select, .filter-bar input { 
            padding: 10px 15px !important; 
            border: 1px solid #e9ecef !important; 
            border-radius: 6px !important; 
            background: #fff !important; 
            color: #495057 !important; 
            font-size: 0.95rem !important; 
        }
        .filter-bar .btn-primary { 
            padding: 10px 20px !important; 
            background: #764ba2 !important; 
            color: #fff !important; 
            border: none !important; 
            border-radius: 6px !important; 
            cursor: pointer !important; 
            font-size: 0.95rem !important; 
            transition: background 0.3s !important; 
        }
        .filter-bar .btn-primary:hover { 
            background: #667eea !important; 
        }
        .table-list { 
            width: 100% !important; 
            border-collapse: collapse !important; 
            background: #fff !important; 
            border-radius: 10px !important; 
            overflow: hidden !important; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important; 
        }
        .table-list thead { 
            background: #f8f9fa !important; 
        }
        .table-list th { 
            padding: 15px 12px !important; 
            text-align: left !important; 
            font-weight: 600 !important; 
            color: #495057 !important; 
            border-bottom: 2px solid #e9ecef !important; 
            font-size: 0.95rem !important; 
        }
        .table-list td { 
            padding: 15px 12px !important; 
            border-bottom: 1px solid #f1f3f4 !important; 
            color: #495057 !important; 
            font-size: 0.95rem !important; 
        }
        .table-list tbody tr:hover { 
            background: #f8f9fa !important; 
        }
        .status-pending { 
            background: #fff3cd !important; 
            color: #856404 !important; 
            padding: 4px 12px !important; 
            border-radius: 20px !important; 
            font-size: 0.85rem !important; 
            font-weight: 500 !important; 
        }
        .status-completed { 
            background: #d4edda !important; 
            color: #155724 !important; 
            padding: 4px 12px !important; 
            border-radius: 20px !important; 
            font-size: 0.85rem !important; 
            font-weight: 500 !important; 
        }
        .btn-primary { 
            background: #764ba2 !important; 
            color: #fff !important; 
            border: none !important; 
            padding: 8px 16px !important; 
            border-radius: 6px !important; 
            cursor: pointer !important; 
            font-size: 0.9rem !important; 
            transition: all 0.3s !important; 
        }
        .btn-primary:hover { 
            background: #667eea !important; 
            transform: translateY(-1px) !important; 
        }
        .btn-link { 
            background: none !important; 
            color: #764ba2 !important; 
            border: none !important; 
            padding: 6px 12px !important; 
            cursor: pointer !important; 
            font-size: 0.9rem !important; 
            text-decoration: underline !important; 
            transition: color 0.3s !important; 
        }
        .btn-link:hover { 
            color: #667eea !important; 
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
    const filePath = path.join(__dirname, `${page.name}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`已生成: ${page.name}.html`);
});

console.log('所有页面生成完成！'); 