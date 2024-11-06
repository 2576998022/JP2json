import { FormatTool } from '../modules/format-tool/index.js';
import { HistoryManager } from '../modules/format-tool/history.js';

document.addEventListener('DOMContentLoaded', () => {
    // 初始化格式转换工具
    const formatTool = new FormatTool();
    const historyManager = new HistoryManager();

    // 菜单切换功能
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page-container');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(mi => mi.classList.remove('active'));
            pages.forEach(page => page.classList.add('hidden'));

            item.classList.add('active');
            const targetPage = document.getElementById(item.dataset.page);
            targetPage.classList.remove('hidden');
        });
    });
}); 