// 企业切换器通用功能
class CompanySwitcher {
    constructor() {
        this.currentCompany = 'company1';
        this.companies = {
            company1: {
                name: '快哥智服科技有限公司',
                code: 'KG001',
                industry: '智能制造',
                scale: '大型企业',
                location: '北京市朝阳区',
                employees: 1200,
                founded: '2018-03-15',
                status: 'active'
            },
            company2: {
                name: '智维技术服务有限公司',
                code: 'ZW002',
                industry: '技术服务',
                scale: '中型企业',
                location: '上海市浦东新区',
                employees: 580,
                founded: '2019-07-22',
                status: 'active'
            },
            company3: {
                name: '快哥设备销售有限公司',
                code: 'KG003',
                industry: '设备销售',
                scale: '中型企业',
                location: '深圳市南山区',
                employees: 320,
                founded: '2020-01-10',
                status: 'active'
            },
            company4: {
                name: '智服培训学院',
                code: 'ZF004',
                industry: '教育培训',
                scale: '小型企业',
                location: '广州市天河区',
                employees: 85,
                founded: '2021-05-18',
                status: 'active'
            }
        };
        
        this.init();
    }

    init() {
        // 绑定企业选择器事件
        const companySelector = document.getElementById('header-company-selector');
        if (companySelector) {
            companySelector.addEventListener('change', (e) => {
                this.switchCompany(e.target.value);
            });
        }

        // 从localStorage获取上次选择的企业
        const savedCompany = localStorage.getItem('currentCompany');
        if (savedCompany && this.companies[savedCompany]) {
            this.currentCompany = savedCompany;
            if (companySelector) {
                companySelector.value = savedCompany;
            }
        }

        // 初始化页面数据
        this.updatePageData();
    }

    switchCompany(companyId) {
        if (!this.companies[companyId]) {
            console.error('企业不存在:', companyId);
            return;
        }

        this.currentCompany = companyId;
        localStorage.setItem('currentCompany', companyId);
        
        // 更新页面数据
        this.updatePageData();
        
        // 系统设置页面不显示切换通知
        const currentPage = this.getCurrentPage();
        if (currentPage !== 'system-config' && 
            currentPage !== 'system-log' && 
            currentPage !== 'system-cache' && 
            currentPage !== 'system-icon') {
            // 显示切换提示
            this.showNotification(`已切换到 ${this.companies[companyId].name}`);
        }
    }

    updatePageData() {
        const company = this.companies[this.currentCompany];
        if (!company) return;

        // 根据当前页面类型更新不同的数据
        const currentPage = this.getCurrentPage();
        
        // 系统设置页面不受企业切换影响
        if (currentPage === 'system-config' || 
            currentPage === 'system-log' || 
            currentPage === 'system-cache' || 
            currentPage === 'system-icon') {
            console.log('系统设置页面，跳过企业数据更新');
            return;
        }
        
        switch (currentPage) {
            case 'overview':
                this.updateOverviewData(company);
                break;
            case 'staff':
                this.updateStaffData(company);
                break;
            case 'staff-review':
                this.updateStaffReviewData(company);
                break;
            case 'org-structure':
                this.updateOrgStructureData(company);
                break;
            case 'position':
                this.updatePositionData(company);
                break;
            case 'company-info':
                this.updateCompanyInfoData(company);
                break;
            case 'role-list':
                this.updateRoleListData(company);
                break;
            case 'permission':
                this.updatePermissionData(company);
                break;
            case 'after-sale':
                this.updateAfterSaleData(company);
                break;
            case 'maintenance-company':
                this.updateMaintenanceCompanyData(company);
                break;
            case 'user-company':
                this.updateUserCompanyData(company);
                break;
            case 'manufacturer-fixed':
                this.updateManufacturerData(company);
                break;
            case 'maintenance-provider':
                this.updateMaintenanceProviderData(company);
                break;
            case 'auth-shop':
                this.updateAuthShopData(company);
                break;
            case 'admin':
                this.updateAdminData(company);
                break;
            default:
                this.updateGeneralData(company);
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename;
    }

    updateOverviewData(company) {
        // 更新企业概览页面数据
        const elements = {
            'company-name': company.name,
            'company-code': company.code,
            'company-industry': company.industry,
            'company-scale': company.scale,
            'company-location': company.location,
            'company-employees': company.employees,
            'company-founded': company.founded,
            'company-status': company.status
        };

        this.updateElements(elements);
    }

    updateStaffData(company) {
        // 更新员工管理页面数据
        const staffCount = Math.floor(company.employees * 0.8);
        const elements = {
            'total-staff': staffCount,
            'active-staff': Math.floor(staffCount * 0.95),
            'pending-staff': Math.floor(staffCount * 0.05)
        };

        this.updateElements(elements);
    }

    updateStaffReviewData(company) {
        // 更新员工审核页面数据
        const pendingCount = Math.floor(company.employees * 0.1);
        const elements = {
            'pending-count': pendingCount,
            'approved-count': Math.floor(pendingCount * 0.3),
            'rejected-count': Math.floor(pendingCount * 0.1)
        };

        this.updateElements(elements);
    }

    updateOrgStructureData(company) {
        // 更新组织结构页面数据
        const deptCount = company.employees > 500 ? 8 : company.employees > 200 ? 6 : 4;
        const elements = {
            'department-count': deptCount,
            'total-positions': deptCount * 3
        };

        this.updateElements(elements);
    }

    updatePositionData(company) {
        // 更新岗位管理页面数据
        const positionCount = Math.floor(company.employees / 20);
        const elements = {
            'position-count': positionCount,
            'active-positions': Math.floor(positionCount * 0.9)
        };

        this.updateElements(elements);
    }

    updateCompanyInfoData(company) {
        // 更新企业资料页面数据
        const elements = {
            'company-name': company.name,
            'company-code': company.code,
            'company-industry': company.industry,
            'company-scale': company.scale,
            'company-location': company.location,
            'company-employees': company.employees,
            'company-founded': company.founded
        };

        this.updateElements(elements);
    }

    updateRoleListData(company) {
        // 更新角色列表页面数据
        const roleCount = company.employees > 500 ? 12 : company.employees > 200 ? 8 : 6;
        const elements = {
            'role-count': roleCount,
            'active-roles': Math.floor(roleCount * 0.85)
        };

        this.updateElements(elements);
    }

    updatePermissionData(company) {
        // 更新权限管理页面数据
        const permissionCount = company.employees > 500 ? 50 : company.employees > 200 ? 35 : 25;
        const elements = {
            'permission-count': permissionCount,
            'active-permissions': Math.floor(permissionCount * 0.9)
        };

        this.updateElements(elements);
    }

    updateAfterSaleData(company) {
        // 更新售后企业页面数据
        const partnerCount = company.employees > 500 ? 25 : company.employees > 200 ? 18 : 12;
        const elements = {
            'partner-count': partnerCount,
            'active-partners': Math.floor(partnerCount * 0.8)
        };

        this.updateElements(elements);
    }

    updateMaintenanceCompanyData(company) {
        // 更新维保企业页面数据
        const maintenanceCount = company.employees > 500 ? 20 : company.employees > 200 ? 15 : 10;
        const elements = {
            'maintenance-count': maintenanceCount,
            'active-maintenance': Math.floor(maintenanceCount * 0.75)
        };

        this.updateElements(elements);
    }

    updateUserCompanyData(company) {
        // 更新设备使用商页面数据
        const userCount = company.employees > 500 ? 150 : company.employees > 200 ? 100 : 60;
        const elements = {
            'user-count': userCount,
            'active-users': Math.floor(userCount * 0.85)
        };

        this.updateElements(elements);
    }

    updateManufacturerData(company) {
        // 更新设备厂商页面数据
        const manufacturerCount = company.employees > 500 ? 30 : company.employees > 200 ? 20 : 15;
        const elements = {
            'manufacturer-count': manufacturerCount,
            'active-manufacturers': Math.floor(manufacturerCount * 0.8)
        };

        this.updateElements(elements);
    }

    updateMaintenanceProviderData(company) {
        // 更新维保服务商页面数据
        const providerCount = company.employees > 500 ? 35 : company.employees > 200 ? 25 : 18;
        const elements = {
            'provider-count': providerCount,
            'active-providers': Math.floor(providerCount * 0.7)
        };

        this.updateElements(elements);
    }

    updateAuthShopData(company) {
        // 更新商家认证页面数据
        const shopCount = company.employees > 500 ? 80 : company.employees > 200 ? 50 : 30;
        const elements = {
            'shop-count': shopCount,
            'active-shops': Math.floor(shopCount * 0.6)
        };

        this.updateElements(elements);
    }

    updateAdminData(company) {
        // 更新管理员管理页面数据
        const adminCount = Math.floor(company.employees / 100);
        const elements = {
            'admin-count': adminCount,
            'active-admins': Math.floor(adminCount * 0.9)
        };

        this.updateElements(elements);
    }

    updateSystemConfigData(company) {
        // 更新系统配置页面数据
        const elements = {
            'config-count': 25,
            'active-configs': 23
        };

        this.updateElements(elements);
    }

    updateSystemLogData(company) {
        // 更新系统日志页面数据
        const logCount = company.employees * 10;
        const elements = {
            'log-count': logCount,
            'today-logs': Math.floor(logCount / 30)
        };

        this.updateElements(elements);
    }

    updateSystemCacheData(company) {
        // 更新系统缓存页面数据
        const cacheSize = company.employees > 500 ? '2.5GB' : company.employees > 200 ? '1.8GB' : '1.2GB';
        const elements = {
            'cache-size': cacheSize,
            'hit-rate': '89.5%'
        };

        this.updateElements(elements);
    }

    updateSystemIconData(company) {
        // 更新系统图标页面数据
        const iconCount = company.employees > 500 ? 450 : company.employees > 200 ? 350 : 250;
        const elements = {
            'icon-count': iconCount,
            'icon-size': '4.2MB'
        };

        this.updateElements(elements);
    }

    updateGeneralData(company) {
        // 更新通用数据
        const elements = {
            'company-name': company.name,
            'company-code': company.code
        };

        this.updateElements(elements);
    }

    updateElements(elements) {
        // 更新页面元素
        Object.keys(elements).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = elements[key];
            }

            // 也查找包含该ID的class
            const elementsByClass = document.querySelectorAll(`.${key}`);
            elementsByClass.forEach(el => {
                el.textContent = elements[key];
            });
        });
    }

    showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            transition: all 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // 3秒后自动移除
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getCurrentCompany() {
        return this.companies[this.currentCompany];
    }

    getCompanyById(id) {
        return this.companies[id];
    }
}

// 页面加载完成后初始化企业切换器
document.addEventListener('DOMContentLoaded', function() {
    window.companySwitcher = new CompanySwitcher();
});
