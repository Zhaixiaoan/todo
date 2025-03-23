use rusqlite::{params, Connection, Result};

use crate::models::TaskList;

pub fn update_task(conn: &mut Connection, task_list: TaskList) -> Result<()> {
    let tx = conn.transaction()?;
    {
        // 准备两个语句：一个用于更新，一个用于插入
        let mut update_stmt = tx.prepare("UPDATE task_list SET task_name = ?1 WHERE id = ?2")?;
        let mut insert_stmt =
            tx.prepare("INSERT INTO task_list (id, task_name,is_have) VALUES (?1, ?2, ?3)")?;
        // 先尝试更新
        let rows_updated = update_stmt.execute(params![task_list.task_name, task_list.id])?;
        // 如果没有更新到任何行，说明记录不存在，执行插入
        if rows_updated == 0 {
            insert_stmt.execute(params![task_list.id, task_list.task_name, 0])?;
        }
    }
    tx.commit()?;
    Ok(())
}

pub fn add_task(conn: &mut Connection, task: String, task_list_id: u64) -> Result<()> {
    match task_list_id {
        1 => {
            conn.execute(
                "INSERT INTO task (my_day,task,state,delete_state) VALUES (?1, ?2, ?3,?4)",
                params![1, task, 0, 0],
            )?;
        }
        2 => {
            conn.execute(
                "INSERT INTO task (im_task,task,state,delete_state) VALUES (?1, ?2, ?3,?4)",
                params![1, task, 0, 0],
            )?;
        }
        3 => {
            conn.execute(
                "INSERT INTO task (my_task,task,state,delete_state) VALUES (?1, ?2, ?3,?4)",
                params![1, task, 0, 0],
            )?;
        }
        _ => {
            conn.execute(
                "INSERT INTO task (list_id,task,state,delete_state) VALUES (?1, ?2, ?3,?4)",
                params![task_list_id, task, 0, 0],
            )?;
        }
    }

    Ok(())
}
