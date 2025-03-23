use serde::Serialize;

#[derive(serde::Deserialize, Debug, Serialize, Default)]
pub struct Task {
    pub id: u64,
    pub list_id: u64,
    pub my_day: i32,
    pub im_task: i32,
    pub my_task: i32,
    pub task: String,
    pub state: i32,
    pub delete_state: i32,
}
