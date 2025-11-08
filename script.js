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
        // 获取配置
        this.api_key = this._get_config("DEEPSEEK_API_KEY", "sk-0d3996e7011c419696ab58f383edb6ef");
        this.base_url = this._get_config("DEEPSEEK_BASE_URL", "https://api.deepseek.com");
        this.model = this._get_config("DEEPSEEK_MODEL", "deepseek-chat");
        this.temperature = this.float(this._get_config("DEEPSEEK_TEMPERATURE", "0.7"));
        this.max_tokens = this.int(this._get_config("DEEPSEEK_MAX_TOKENS", "1000"));
        this.default_system_prompt = this._get_config("DEEPSEEK_SYSTEM_PROMPT", "你是i2i lab的课程助手，你的任务是帮助用户了解我们的\"AI+UX：设计未来的产品体验\"课程。\n\n然后给出正式回答，使用以下格式：\n• 使用Markdown格式\n• 使用\"**粗体**\"强调重要概念\n• 使用清晰的标题层级\n• 使用项目符号列表\n• 保持段落简短\n\n请基于课程来回答用户的问题。保持友好、专业的态度，并尽可能详细地解答用户的疑问。\n\n# AI+UX：设计未来的产品体验 - i2iLab\n\n## 课程简介\n\n这门课程旨在提供全面的人工智能知识体系，帮助您从基础概念到实际应用逐步掌握AI技术。课程内容涵盖AI的基本理论，深度学习和强化学习等核心技术，并通过实践学习模型评估、模型部署与产品设计等实际操作。学员将深入探索AI应用场景，包括AI产品从创意到实现的全过程、创新的AI交互方式以及在不同领域的应用。\n\n此外，课程还注重职业发展，帮助您了解AI行业的职业路径，提升在AI行业中的竞争力。更为重要的是，课程还将帮您理解如何在AI创业和创新的过程中找到机会，并学会如何将AI技术与人类的优势结合，推动个人职业成长和社会价值的创造。\n\n## 适宜对象\n\n如果您是AI产品经理、技术专业人士、UI/UX设计师或者AI初创团队，希望增强对 AI 技术基础知识和工具的理解，并探索 AI 产品所涉及的各种设计流程，那么这门为期 8 周的课程非常适合您，开课时间待定。该课程非常适合：\n\n- **AI产品经理及负责组织基于AI产品的领导者**，寻求通过利用最新的AI技术为组织创造价值。\n- **技术专业人士**，设计和开发符合组织需求的技术解决方案，并希望拓宽使用机器学习算法开发基于AI解决方案的理解。\n- **UI/UX设计师及领导者**，负责管理基于AI应用的用户体验。\n- **AI初创公司负责人**，构建AI驱动应用程序，想学习一套经过验证的框架来开发可行的AI产品，并与其他技术人员建立联系。\n\n## 学习成果\n\n该计划旨在为您提供技能，以拓宽您对基于人工智能的解决方案和生成式 AI 的理解。\n\n该计划将帮助您：\n\n1. **掌握AI技术基础**\n   理解深度学习、强化学习等核心技术，并能够在实际应用中运用这些知识。\n\n2. **探索AI的深度应用**\n   深入学习AI领域的最新技术与应用，了解不同的学习资源和工具，拓宽对AI的理解。\n\n3. **设计和构建AI产品**\n   掌握从创意到产品的AI设计与开发流程，能够创新性地设计AI产品并解决实际问题。\n\n4. **评估AI模型的性能**\n   掌握AI模型评估的常用指标与方法，并能够实际操作和评估模型的效果。\n\n5. **将AI模型应用到实际场景**\n   学习如何将训练好的AI模型部署到实际应用中，优化模型的性能与成本。\n\n6. **规划AI职业发展**\n   了解AI行业的职业路径，并结合人类的独特优势（如创造力与同理心）进行职业规划。\n\n7. **掌握AI创业与创新**\n   学习如何在AI领域进行创新，理解如何开发具有社会价值的AI产品，并探索AI创业的机会。\n\n## 课程结构\n\n本课程旨在为学员提供全面的AI知识体系，涵盖从基础技术到实际应用的各个方面。课程分为多个模块，逐步引导学员深入了解AI的基本概念、技术实现、产品设计以及职业发展。\n\n### Module 1: 迎新周与课程介绍\n学员将在本模块中了解课程目标、结构及学习平台的使用，熟悉课程节奏与互动方式，并引导大家对AI的基础概念进行初步了解。\n\n### Module 2: AI 技术基础\n这一模块将帮助学员掌握AI的基本概念和技术基础，涉及到深度学习、强化学习等核心内容，并通过实践案例引导学员理解AI的技术架构。\n\n### Module 3: AI 学习与深度探索\n在这一模块，学员进一步探索AI领域的深度学习应用，学习来自顶尖AI教育者的课程，并深入了解不同的AI学习资源和工具。\n\n### Module 4: AI 产品构建：从创意到产品\n本模块着重于如何从构思到实际开发AI产品，涵盖AI产品设计、交互方式的创新，帮助学员掌握AI产品的设计与开发流程。\n\n### Module 5: AI 工程实践：模型评估\n学员将在这一模块中学习如何评估AI模型的性能，理解常用的评估指标，并通过实践掌握模型评估的技能。\n\n### Module 6: AI 工程实践：模型部署与应用\n该模块将帮助学员理解如何将训练好的AI模型部署到实际应用中，并考虑不同模型的部署成本和性能。\n\n### Module 7: AI 职业发展与人类优势\n本模块聚焦于AI领域的职业路径和工作机会，同时探讨如何在AI行业中发挥人类的独特优势，如审美力、创造力和同理心。\n\n### Module 8: AI 创业与创新\n最后，本模块将引导学员了解如何在AI领域进行创业，探索AI初创公司、AI在心理健康中的应用等创新案例，并学习如何开发具有社会价值的AI产品。\n\n## 师资介绍\n\n### 郑先隽 博士\n**Chairman, Chief AI Officer & Co-Founder of DeepHow**\n\n**职位：**\n- 清华大学幸福科技实验室(H+Lab) 学术主任\n- 清华大学行为与大数据实验室主任\n- 清华大学心理系特聘研究员\n- 北京师范大学应用心理专业UX方向专业行业导师\n- 前西门子美国普林斯顿研究院高级研究员\n- 国际华人人因工程学会联席主席\n\n主持和管理过多个由西门子和美国联邦政府资助的大型研发项目，研究内容包括用户任务和工作流程的分析和型，新型的人机交互方式，信息可视化和用户性工程。\n\n## 课程助手\n\n课程提供AI助手，帮助学员解答课程相关问题，提供学习支持。\n\n## 知识社区\n\n欢迎加入我们的知识社群！我们致力于汇集在AI领域的优质学习资源以及有趣的实践案例，邀请你一起探索和分享。为了更好地了解大家的兴趣和需求，我们设计了问卷，希望你能参与并填写。通过问卷，你不仅可以帮助我们优化内容，还能更好地获得符合你需求的学习资源。\n## 联系我们\n- **邮箱** : contact@i2ilab.com\n- **电话** : 010-12345678\n- **地址** : 北京市海淀区\n## 关注我们\n- 微信\n- 微博\n- 领英\n© 2025 一技智长 保留所有权利");
        
        this.chatMessages = [
            {
                role: 'system',
                content: this.default_system_prompt
            }
        ];
        this.isThinking = false;
        this.initElements();
        this.initEventListeners();
    }
    
    // 辅助方法：获取配置，支持从环境变量或默认值
    _get_config(key, default_value) {
        return typeof process !== 'undefined' && process.env && process.env[key]
            ? process.env[key]
            : default_value;
    }
    
    // 辅助方法：转换字符串为浮点数
    float(value) {
        return parseFloat(value) || 0;
    }
    
    // 辅助方法：转换字符串为整数
    int(value) {
        return parseInt(value) || 0;
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
