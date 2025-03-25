mod handers;
mod models;

use handers::*;
use models::*;
use rusqlite::Connection;
use std::sync::Mutex;
use tauri::ipc::Response;
use tracing::{info, level_filters::LevelFilter};
use tracing_subscriber::{fmt::Layer, layer::SubscriberExt, util::SubscriberInitExt, Layer as _};

#[derive(Debug)]
struct AppState {
    db: Mutex<Connection>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let layer = Layer::new().with_filter(LevelFilter::INFO);
    tracing_subscriber::registry().with(layer).init();
    // 创建数据库连接
    let conn = Connection::open("my_database.db").expect("Failed to connect to database");

    // 初始化数据库表和数据
    let _ = create_table(&conn);
    let _ = insert_user(&conn);
    // let menu = tauri::Menu::new()
    //     .add_item(tauri::MenuItem::new("Copy", "copy", true, None))
    //     .add_item(tauri::MenuItem::new("Paste", "paste", true, None))
    //     .add_item(tauri::MenuItem::new("Cut", "cut", true, None));

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState {
            db: Mutex::new(conn),
        })
        .invoke_handler(tauri::generate_handler![
            get_my_items,
            update_my_items,
            add_my_task,
            get_my_task
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

//获取任务列表
#[tauri::command]
fn get_my_items(state: tauri::State<AppState>) -> Response {
    // 这里可以从数据库或文件读取数据
    info!("数据进来了");
    let conn = state.db.lock().unwrap();
    let task_list = get_task_list(&conn);
    tauri::ipc::Response::new(serde_json::to_string(&task_list).unwrap())
}

//添加更新任务列表
#[tauri::command]
fn update_my_items(task: TaskList, state: tauri::State<AppState>) {
    info!("前端传来的任务列表 {:?}", task);
    let mut conn = state.db.lock().unwrap();
    update_task(&mut conn, task).unwrap();
}

#[tauri::command]
fn add_my_task(task: String, task_list_id: u64, state: tauri::State<AppState>) {
    info!("从前端接收到的输入内容: {},id为{}", task, task_list_id);
    let mut conn = state.db.lock().unwrap();
    add_task(&mut conn, task, task_list_id).unwrap();
}

#[tauri::command]
fn get_my_task(task_list_id: u64, state: tauri::State<AppState>) -> Response {
    let conn = state.db.lock().unwrap();
    let task = get_task(&conn, task_list_id);
    tauri::ipc::Response::new(serde_json::to_string(&task).unwrap())
}
