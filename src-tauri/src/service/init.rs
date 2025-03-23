use rusqlite::{params, Connection, Result};
use tracing::info;

pub fn create_table(conn: &Connection) -> Result<()> {
    conn.execute(
        "CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY,
            list_id INTEGER,
            my_day INTEGER,
            im_task INTEGER,
            my_task TEXT,
            task TEXT,
            state INTEGER,
            delete_state INTEGER
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS task_list (
            id INTEGER PRIMARY KEY,
            task_name TEXT, 
            is_have INTEGER
        )",
        [],
    )?;

    Ok(())
}

pub fn insert_user(conn: &Connection) -> Result<()> {
    //查询如果不存在则创建
    let mut stmt = conn.prepare("select * from  task_list WHERE id in (1,2,3)")?;
    let rows = stmt.query_map([], |row| row.get::<_, i32>(0))?;
    if rows.count() == 0 {
        conn.execute(
            "INSERT INTO task_list (id, task_name,is_have) VALUES (?1, ?2, ?3)",
            params![1, "我的一天", 1],
        )?;
        conn.execute(
            "INSERT INTO task_list (id, task_name,is_have) VALUES (?1, ?2,?3)",
            params![2, "重要", 1],
        )?;
        conn.execute(
            "INSERT INTO task_list (id, task_name,is_have) VALUES (?1, ?2,?3)",
            params![3, "已分配给我的", 1],
        )?;
    }
    info!("添加默认数据成功");
    Ok(())
}
