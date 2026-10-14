use rand::random_range;
use rand::random_bool;

#[tauri::command(rename_all = "camelCase")]
pub fn generate_correct_instance(
    x: usize,
    y: usize,
    min_interval: usize,
) -> Result<Vec<Vec<bool>>, String> {

    if min_interval == 0 || min_interval > x {
        return Err("Minimum interval must be between 1 and the sequence length".to_string());
    }

    let mut instance = vec![vec![false; x]; y];

    for i in 0..y {
        let start = random_range(0..=x - min_interval);
        let end = random_range(start + min_interval..=x);

        for j in start..end {
            instance[i][j] = true
        }
    }

    Ok(instance)
}

#[tauri::command(rename_all = "camelCase")]
pub fn apply_errors_to_instance(
    mut instance: Vec<Vec<bool>>,
    error_prob: f64,
) -> Result<Vec<Vec<bool>>, String> {

    if error_prob < 0.0 || error_prob > 1.0 {
        return Err("Minimum error probability must be between 0 and 1".to_string());
    }




    let correct_prob: f64 = 1.0 - error_prob;

    for row in &mut instance {
        for value in row {
            if *value == true {
                *value = random_bool(correct_prob)
            }
        }
    }

    Ok(instance)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_instance() {
        let result = generate_correct_instance(5, 3, 2);

        assert!(result.is_ok());

        // println!("{:?}", result.as_ref().unwrap());
    }
}
