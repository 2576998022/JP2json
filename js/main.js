import { FormatTool } from '../modules/format-tool/index.js';
import { HistoryManager } from '../modules/format-tool/history.js';
import { initClickEffect } from '../utils/click-effect.js';

document.addEventListener('DOMContentLoaded', () => {
    const contentFrame = document.getElementById('contentFrame');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有活动状态
            menuItems.forEach(mi => mi.classList.remove('active'));
            // 添加当前活动状态
            item.classList.add('active');
            // 切换iframe内容
            const page = item.dataset.page;
            contentFrame.src = `pages/${page}.html`;
        });
    });

    // 初始化点击特效
    initClickEffect();
}); 