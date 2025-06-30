// AJAX页面加载器
const pageFileMap = {
    'dashboard': 'dashboard.html',
    'shop': 'shop.html',
    'teaching': 'teaching.html',
    'repair-order': 'repair-order.html',
    'install-order': 'install-order.html',
    'debug-order': 'debug-order.html',
    'assist-launch': 'assist-launch.html',
    'assist-record': 'assist-record.html',
    'assist-order': 'assist-order.html',
    'knowledge': 'knowledge.html',
    'auth-real': 'auth-real.html',
    'auth-repair': 'auth-repair.html',
    'auth-expert': 'auth-expert.html',
    'auth-shop': 'auth-shop.html',
    'company-create': 'company-create.html',
    'company-join': 'company-join.html',
    'company-manage': 'company-manage.html',
    'profile': 'profile.html',
    'password': 'password.html',
    'security': 'security.html'
};

// 加载页面内容的函数
function loadPageContent(pageKey) {
    const mainContent = document.getElementById('main-content');
    const fileName = pageFileMap[pageKey];
    
    if (!fileName) {
        console.error('未找到页面文件映射:', pageKey);
        return;
    }

    // 显示加载状态
    mainContent.innerHTML = `
        <div class="main-content" style="display: flex; justify-content: center; align-items: center; height: 400px;">
            <div style="text-align: center;">
                <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="color: #6c757d; font-size: 1rem;">正在加载页面内容...</p>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    // 通过fetch加载HTML文件内容
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // 提取body中的内容（去掉html、head、body标签）
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            // 将内容插入到主内容区域
            mainContent.innerHTML = `<div class="main-content">${bodyContent}</div>`;
            
            // 重新执行页面中的脚本
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.src) {
                    // 外部脚本
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    document.head.appendChild(newScript);
                } else {
                    // 内联脚本
                    try {
                        eval(script.textContent);
                    } catch (e) {
                        console.warn('执行脚本时出错:', e);
                    }
                }
            });
        })
        .catch(error => {
            console.error('加载页面失败:', error);
            mainContent.innerHTML = `
                <div class="main-content" style="display: flex; justify-content: center; align-items: center; height: 400px;">
                    <div style="text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #dc3545; margin-bottom: 20px;"></i>
                        <h3 style="color: #333; margin-bottom: 10px;">页面加载失败</h3>
                        <p style="color: #6c757d; font-size: 1rem;">无法加载 ${fileName} 文件</p>
                        <button onclick="loadPageContent('${pageKey}')" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-redo"></i> 重新加载
                        </button>
                    </div>
                </div>
            `;
        });
}

// 重写showPage函数
function showPage(pageKey) {
    loadPageContent(pageKey);
} 