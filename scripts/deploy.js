import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function deploy() {
    try {
        // 检查是否有未提交的更改
        const { stdout: status } = await execAsync('git status --porcelain');
        if (!status) {
            console.log('没有需要提交的更改');
            return;
        }

        // 获取当前时间
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0];

        // 读取 package.json 获取版本号
        const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
        const version = packageJson.version;

        // Git 操作
        console.log('开始提交代码...');
        
        // 添加所有更改
        await execAsync('git add .');
        console.log('✓ 已添加更改文件');

        // 提交更改
        const commitMessage = `更新: v${version} (${dateStr} ${timeStr})

- 更新时间: ${dateStr} ${timeStr}
- 版本号: ${version}

提交内容:
${status.split('\n').map(line => `- ${line.trim()}`).join('\n')}`;

        await execAsync(`git commit -m "${commitMessage}"`);
        console.log('✓ 已提交更改');

        // 推送到远程仓库
        await execAsync('git push -u origin main');
        console.log('✓ 已推送到远程仓库');

        console.log('\n部署完成! 🎉');

    } catch (error) {
        console.error('部署失败:', error.message);
        process.exit(1);
    }
}

// 运行部署脚本
deploy(); 