import { showToast } from '../../utils/toast.js';

export class DataList {
    constructor() {
        // 确保在iframe内部运行
        if (window.self === window.top) {
            console.warn('DataList 应该在 iframe 内运行');
            return;
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.initElements();
        this.bindEvents();
        // 初始加载数据
        this.loadData();
    }

    initElements() {
        this.tableBody = document.getElementById('dataTableBody');
        this.firstPageBtn = document.getElementById('firstPage');
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.lastPageBtn = document.getElementById('lastPage');
        this.currentPageSpan = document.getElementById('currentPage');
        this.totalPagesSpan = document.getElementById('totalPages');
    }

    bindEvents() {
        this.firstPageBtn.addEventListener('click', () => this.goToPage(1));
        this.prevPageBtn.addEventListener('click', () => this.prevPage());
        this.nextPageBtn.addEventListener('click', () => this.nextPage());
        this.lastPageBtn.addEventListener('click', () => this.goToLastPage());
    }

    // 加载数据的占位方法
    async loadData() {
        try {
            this.tableBody.innerHTML = '<tr><td colspan="7" class="loading-text">加载中...</td></tr>';
            
            const response = await fetch(`http://localhost:3001/api/sentences?page=${this.currentPage}&pageSize=${this.pageSize}`);
            const result = await response.json();

            if (result.status === 'success') {
                this.renderData(result.data);
                this.totalPages = Math.ceil(result.total / this.pageSize);
                this.updatePagination();
            } else {
                showToast('加载数据失败，请稍后重试');
            }
        } catch (error) {
            console.error('加载数据失败：', error);
            showToast('加载数据失败，请稍后重试');
        }
    }

    renderData(data) {
        this.tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.japanese}</td>
                <td>${item.chinese}</td>
                <td>${item.romaji}</td>
                <td>${item.audio_url ? `<a href="${item.audio_url}" class="audio-link">播放</a>` : '-'}</td>
                <td>${item.created_at}</td>
                <td>${item.updated_at}</td>
            </tr>
        `).join('');
    }

    updatePagination() {
        this.currentPageSpan.textContent = this.currentPage;
        this.totalPagesSpan.textContent = this.totalPages;
        
        // 更新按钮状态
        this.firstPageBtn.disabled = this.currentPage === 1;
        this.prevPageBtn.disabled = this.currentPage === 1;
        this.nextPageBtn.disabled = this.currentPage === this.totalPages;
        this.lastPageBtn.disabled = this.currentPage === this.totalPages;
    }

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.loadData();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadData();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadData();
        }
    }

    goToLastPage() {
        if (this.currentPage !== this.totalPages) {
            this.currentPage = this.totalPages;
            this.loadData();
        }
    }
}

// 初始化数据列表
new DataList(); 