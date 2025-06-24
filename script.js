// DOM 元素
const userTypeBtns = document.querySelectorAll('.type-btn');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const switchLinks = document.querySelectorAll('.switch-link');
const loginFormElement = document.getElementById('loginForm');
const registerFormElement = document.getElementById('registerForm');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const sendCodeBtns = document.querySelectorAll('.send-code-btn');
const passwordInput = document.getElementById('registerPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthFill = document.querySelector('.strength-fill');
const strengthText = document.querySelector('.strength-text');
const verificationGroup = document.querySelector('.verification-group');

// 用户类型切换
userTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有活动状态
        userTypeBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮的活动状态
        btn.classList.add('active');
        
        const userType = btn.dataset.type;
        console.log('切换到用户类型:', userType);
        
        // 根据用户类型调整界面
        if (userType === 'enterprise') {
            // 企业用户登录时显示验证码选项
            verificationGroup.style.display = 'block';
        } else {
            // 个人用户隐藏验证码选项
            verificationGroup.style.display = 'none';
        }
    });
});

// 登录注册表单切换
switchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const action = link.dataset.action;
        
        if (action === 'show-register') {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        } else if (action === 'show-login') {
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        }
    });
});

// 密码显示/隐藏切换
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            btn.classList.remove('fa-eye-slash');
            btn.classList.add('fa-eye');
        } else {
            input.type = 'password';
            btn.classList.remove('fa-eye');
            btn.classList.add('fa-eye-slash');
        }
    });
});

// 发送验证码
sendCodeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const phoneInput = btn.closest('.form-group').previousElementSibling?.querySelector('input') || 
                          btn.closest('.form-group').querySelector('input');
        const phone = phoneInput.value.trim();
        
        if (!phone) {
            showMessage('请先输入手机号码', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showMessage('请输入正确的手机号码', 'error');
            return;
        }
        
        // 模拟发送验证码
        btn.disabled = true;
        btn.textContent = '60s';
        
        let countdown = 60;
        const timer = setInterval(() => {
            countdown--;
            btn.textContent = countdown + 's';
            
            if (countdown <= 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.textContent = '获取验证码';
            }
        }, 1000);
        
        showMessage('验证码已发送', 'success');
    });
});

// 密码强度检测
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    
    strengthFill.className = 'strength-fill';
    if (strength === 'weak') {
        strengthFill.classList.add('weak');
        strengthText.textContent = '密码强度：弱';
    } else if (strength === 'medium') {
        strengthFill.classList.add('medium');
        strengthText.textContent = '密码强度：中';
    } else if (strength === 'strong') {
        strengthFill.classList.add('strong');
        strengthText.textContent = '密码强度：强';
    }
});

// 确认密码验证
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordInput.style.borderColor = '#dc3545';
    } else {
        confirmPasswordInput.style.borderColor = '#e9ecef';
    }
});

// 登录表单提交
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('loginPhone').value.trim();
    const password = document.getElementById('loginPassword').value;
    const code = document.getElementById('loginCode').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    const isEnterprise = document.querySelector('.type-btn.active').dataset.type === 'enterprise';
    
    // 表单验证
    if (!phone) {
        showMessage('请输入手机号码', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showMessage('请输入正确的手机号码', 'error');
        return;
    }
    
    if (!password) {
        showMessage('请输入密码', 'error');
        return;
    }
    
    if (isEnterprise && !code) {
        showMessage('请输入验证码', 'error');
        return;
    }
    
    // 模拟登录请求
    showLoading('登录中...');
    
    setTimeout(() => {
        hideLoading();
        
        // 模拟登录成功
        if (isEnterprise) {
            showMessage('企业用户登录成功，正在跳转到企业空间...', 'success');
            // 跳转到企业空间
            setTimeout(() => {
                window.location.href = 'enterprise/index.html';
            }, 2000);
        } else {
            showMessage('个人用户登录成功，正在跳转到个人空间...', 'success');
            // 跳转到个人空间
            setTimeout(() => {
                window.location.href = 'personal/index.html';
            }, 2000);
        }
    }, 2000);
});

// 注册表单提交
registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('registerPhone').value.trim();
    const code = document.getElementById('registerCode').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // 表单验证
    if (!phone) {
        showMessage('请输入手机号码', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showMessage('请输入正确的手机号码', 'error');
        return;
    }
    
    if (!code) {
        showMessage('请输入验证码', 'error');
        return;
    }
    
    if (!password) {
        showMessage('请设置密码', 'error');
        return;
    }
    
    if (password.length < 8) {
        showMessage('密码长度不能少于8位', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showMessage('请阅读并同意用户协议和隐私政策', 'error');
        return;
    }
    
    // 模拟注册请求
    showLoading('注册中...');
    
    setTimeout(() => {
        hideLoading();
        showMessage('注册成功！正在跳转到个人空间...', 'success');
        
        // 注册成功后跳转到个人空间
        setTimeout(() => {
            window.location.href = 'personal/index.html';
        }, 2000);
    }, 2000);
});

// 工具函数
function isValidPhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function checkPasswordStrength(password) {
    if (password.length < 8) return 'weak';
    
    let score = 0;
    
    // 包含数字
    if (/\d/.test(password)) score++;
    // 包含小写字母
    if (/[a-z]/.test(password)) score++;
    // 包含大写字母
    if (/[A-Z]/.test(password)) score++;
    // 包含特殊字符
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
}

// 消息提示
function showMessage(message, type = 'info') {
    // 移除现有的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `message-toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// 加载状态
function showLoading(message) {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-content p {
        margin: 0;
        font-size: 16px;
    }
`;
document.head.appendChild(style);

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('快哥智服平台登录页面加载完成');
    
    // 检查是否有保存的登录信息
    const savedPhone = localStorage.getItem('savedPhone');
    const savedRememberMe = localStorage.getItem('rememberMe');
    
    if (savedPhone && savedRememberMe === 'true') {
        document.getElementById('loginPhone').value = savedPhone;
        document.getElementById('rememberMe').checked = true;
    }
    
    // 记住登录信息
    document.getElementById('rememberMe').addEventListener('change', (e) => {
        if (e.target.checked) {
            const phone = document.getElementById('loginPhone').value;
            localStorage.setItem('savedPhone', phone);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedPhone');
            localStorage.removeItem('rememberMe');
        }
    });
}); 