use serde::Serialize;

#[derive(serde::Deserialize, Debug, Serialize)]
pub struct TaskList {
    pub id: u64,
    pub task_name: String,
    pub is_have: i32,
}
