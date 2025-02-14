// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 表单提交处理
document.querySelector('.cta-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // 这里可以添加表单提交逻辑
    console.log('提交的信息：', { name, email });
    alert('感谢您的关注！课程手册将发送到您的邮箱。');
});

// 打字效果
function setupTypingEffect() {
    const texts = [' Idea to Impact'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100; // 打字速度
    const erasingDelay = 50;  // 删除速度
    const newTextDelay = 2000; // 完成打字后的停顿时间

    const typingElement = document.querySelector('.typing-text');

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // 删除文字
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // 添加文字
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        // 处理动画状态
        if (!isDeleting && charIndex === currentText.length) {
            // 完成打字，等待一段时间后开始删除
            setTimeout(() => isDeleting = true, newTextDelay);
        } else if (isDeleting && charIndex === 0) {
            // 完成删除，重新开始
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        // 设置下一帧的延迟
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }

    // 开始动画
    setTimeout(type, newTextDelay);
}

// 页面加载完成后启动打字效果
document.addEventListener('DOMContentLoaded', setupTypingEffect);

class ChatAssistant {
    constructor() {
        this.API_KEY = '3f7daf30dfdc4ce48472b2e021448ef0.AgvimzjOd6ZZV7JL';
        this.chatMessages = [
            {
                role: 'system',
                content: `你是i2i lab的课程助手，你的任务是帮助用户了解我们的"AI+UX：设计未来的产品体验"课程。

当用户启用深度思考模式时，请按以下格式回答：

思考过程：
• 分析问题要点
• 梳理相关信息
• 确定回答框架
• 组织答案结构

然后给出正式回答，使用以下格式：
• 使用Markdown格式
• 使用"**粗体**"强调重要概念
• 使用清晰的标题层级
• 使用项目符号列表
• 保持段落简短

不使用深度思考模式时，直接给出答案即可。

请基于课程简介、适宜对象、学习成果、课程结构等内容来回答用户的问题。保持友好、专业的态度，并尽可能详细地解答用户的疑问。`
            }
        ];
        this.isThinking = false;
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.chatContainer = document.querySelector('.chat-messages');
        this.inputArea = document.querySelector('.chat-input');
        this.sendButton = document.querySelector('.send-btn');
        this.deepThinkingBtn = document.querySelector('.feature-btn[title="深度思考"]');
        this.webSearchBtn = document.querySelector('.feature-btn[title="联网搜索"]');
    }

    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputArea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // 深度思考模式
        this.deepThinkingBtn.addEventListener('click', () => {
            this.deepThinkingBtn.classList.toggle('active');
        });
        
        // 联网搜索模式
        this.webSearchBtn.addEventListener('click', () => {
            this.webSearchBtn.classList.toggle('active');
        });
    }

    async sendMessage() {
        const userInput = this.inputArea.value.trim();
        if (!userInput || this.isThinking) return;

        // 添加用户消息到聊天界面
        this.addMessageToChat('user', userInput);
        this.inputArea.value = '';
        this.isThinking = true;

        // 准备API请求参数
        const messages = [...this.chatMessages];
        
        // 如果启用了深度思考模式，添加特殊提示
        if (this.deepThinkingBtn.classList.contains('active')) {
            messages.push({
                role: 'user',
                content: `请使用深度思考模式回答以下问题，先展示你的思考过程，然后再给出最终答案。问题是：${userInput}`
            });
        } else {
            messages.push({
                role: 'user',
                content: userInput
            });
        }

        const requestParams = {
            model: 'glm-4-plus',
            messages: messages,
            stream: true,
            temperature: this.deepThinkingBtn.classList.contains('active') ? 0.2 : 0.7,
            top_p: this.deepThinkingBtn.classList.contains('active') ? 0.1 : 0.7
        };

        // 如果启用了联网搜索
        if (this.webSearchBtn.classList.contains('active')) {
            requestParams.tools = [{
                type: 'web_search',
                web_search: {
                    enable: true
                }
            }];
        }

        try {
            const response = await this.makeAPIRequest(requestParams);
            this.handleAPIResponse(response);
        } catch (error) {
            console.error('API请求错误:', error);
            this.addMessageToChat('assistant', '抱歉，我遇到了一些问题，请稍后再试。');
        } finally {
            this.isThinking = false;
        }
    }

    async makeAPIRequest(params) {
        // 生成当前时间戳
        const timestamp = Math.floor(Date.now() / 1000);
        
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.API_KEY}`,
                'X-ZhipuAI-Request-Id': `i2i_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
            },
            body: JSON.stringify({
                ...params,
                temperature: params.temperature || 0.7,
                top_p: params.top_p || 0.7,
                request_id: `i2i_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        return response;
    }

    handleAPIResponse(response) {
        const reader = response.body.getReader();
        let assistantMessage = '';
        let messageDiv = null;
        
        reader.read().then(function processText({ done, value }) {
            if (done) {
                if (assistantMessage) {
                    this.chatMessages.push({ role: 'assistant', content: assistantMessage });
                }
                this.isThinking = false;
                return;
            }

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            lines.forEach(line => {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.slice(6);
                    if (jsonStr === '[DONE]') return;
                    
                    try {
                        const jsonData = JSON.parse(jsonStr);
                        if (jsonData.choices && jsonData.choices[0].delta) {
                            const content = jsonData.choices[0].delta.content;
                            if (content) {
                                assistantMessage += content;
                                if (!messageDiv) {
                                    messageDiv = this.addMessageToChat('assistant', '');
                                }
                                this.updateAssistantMessage(assistantMessage, messageDiv);
                            }
                        }
                    } catch (e) {
                        console.error('JSON解析错误:', e);
                    }
                }
            });

            return reader.read().then(processText.bind(this));
        }.bind(this)).catch(error => {
            console.error('流式响应处理错误:', error);
            this.addMessageToChat('assistant', '抱歉，处理响应时出现错误，请稍后重试。');
            this.isThinking = false;
        });
    }

    addMessageToChat(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const contentHtml = role === 'user' 
            ? this.escapeHtml(content)
            : ''; // 助手消息初始为空，等待流式更新
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${contentHtml}</div>
            </div>
        `;
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        
        if (role === 'user') {
            this.chatMessages.push({ role, content });
        }
        
        return messageDiv;
    }

    updateAssistantMessage(content, messageDiv) {
        if (messageDiv) {
            const contentDiv = messageDiv.querySelector('.message-text');
            
            // 检查是否是深度思考模式的回答
            if (this.deepThinkingBtn.classList.contains('active') && content.includes('思考过程：')) {
                // 提取问题标题
                const titleMatch = content.match(/##\s*(.+?)\n/);
                const questionTitle = titleMatch ? titleMatch[1].trim() : '回答总结';
                
                // 分割思考过程和最终答案
                const [thinkingProcess, finalAnswer] = content.split(/(?=##\s*最终回答)/i);
                
                // 处理思考过程文本：移除所有标记符号，保留纯文本
                const cleanThinkingProcess = thinkingProcess
                    .replace(/思考过程：/, '')  // 移除标题
                    .replace(/[•*-]\s*/g, '')   // 移除项目符号
                    .replace(/^\d+\.\s*/gm, '') // 移除数字编号
                    .replace(/\n+/g, '\n')      // 处理多余的换行
                    .trim();
                
                // 创建思考过程和最终答案区域
                const thinkingHtml = `
                    <div class="thinking-process">
                        <p>${cleanThinkingProcess}</p>
                    </div>
                    <div class="thought-divider" data-title="${questionTitle}"></div>
                    <div class="final-answer">
                        ${finalAnswer ? marked.parse(finalAnswer) : ''}
                    </div>
                `;
                
                contentDiv.innerHTML = thinkingHtml;
            } else {
                // 普通模式直接渲染
                contentDiv.innerHTML = marked.parse(content);
            }
            
            this.applyMessageStyles(contentDiv);
        }
    }

    applyMessageStyles(element) {
        // 为列表项添加样式
        element.querySelectorAll('ul li, ol li').forEach(li => {
            li.style.marginBottom = '0.5rem';
        });
        
        // 为标题添加样式
        element.querySelectorAll('h2, h3').forEach(heading => {
            heading.style.marginTop = '1rem';
            heading.style.marginBottom = '0.5rem';
            heading.style.color = 'var(--primary-color)';
        });
        
        // 确保段落间距适当
        element.querySelectorAll('p').forEach(p => {
            p.style.marginBottom = '0.8rem';
        });
        
        // 为思考过程添加额外的样式
        element.querySelectorAll('.thinking-process .step').forEach(step => {
            step.style.marginBottom = '0.8rem';
        });
        
        element.querySelectorAll('.thinking-process .conclusion').forEach(conclusion => {
            conclusion.style.fontStyle = 'italic';
            conclusion.style.color = '#555';
        });
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// 初始化聊天助手
document.addEventListener('DOMContentLoaded', () => {
    const chatAssistant = new ChatAssistant();
}); 