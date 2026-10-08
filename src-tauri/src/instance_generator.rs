#[tauri::command]
pub fn generate_instance(x: usize, y: usize) -> Vec<Vec<u8>> {
    vec![vec![0; y]; x]
}
