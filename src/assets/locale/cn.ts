interface Locale {
    el: LocaleEl
}

interface LocaleEl {
    table: Table,
    pagination: Pagination,
    select: Select
}

interface Table {
    emptyText: string,
    confirmFilter: string,
    resetFilter: string,
    clearFilter: string,
    sumText: string
}

interface Select {
    placeholder: string
}

interface Pagination {
    goto: string,
    pagesize: string,
    total: string,
    pageClassifier: string
}

const locale:Locale = {
    el: {
        table: {
            emptyText: '暂无数据',
            confirmFilter: '筛选',
            resetFilter: '重置',
            clearFilter: '全部',
            sumText: '合计'
        },
        pagination: {
            goto: '前往',
            pagesize: '条/页',
            total: `共{total} 条`,
            pageClassifier: '页'
        },
        select: {
            placeholder: '请选择'
        }
    }
}

export default locale