use std::fs::File;
use std::io::Write;

use http::Uri;
use serde::{
    de::{Deserializer, Error as DeserializeError, Unexpected},
    Deserialize,
};

#[derive(Deserialize)]
#[serde(rename_all = "kebab-case")]
struct Config {
    user: String,
    password: String,
    log_filters: String,
    index_batch_size: Option<u16>,
    index_lookup_limit: Option<u16>,
}

fn main() -> Result<(), anyhow::Error> {
    let config: Config = serde_yaml::from_reader(File::open("/data/start9/config.yaml")?)?;

    {
        let mut outfile = File::create("/data/electrs.toml")?;

        let mut index_batch_size: String = "".to_string();
        if config.index_batch_size.is_some() {
            index_batch_size = format!(
                "index_batch_size = {}",
                config.index_batch_size.unwrap()
            );
        }

        let mut index_lookup_limit: String = "".to_string();
        if config.index_lookup_limit.is_some() {
            index_lookup_limit = format!(
                "index_batch_size = {}",
                config.index_lookup_limit.unwrap()
            );
        }

        write!(
            outfile,
            include_str!("electrs.toml.template"),
            bitcoin_rpc_user = config.user,
            bitcoin_rpc_pass = config.password,
            bitcoin_rpc_host = "bitcoind.embassy",
            bitcoin_rpc_port = 8332,
            bitcoin_p2p_host = "bitcoind.embassy",
            bitcoin_p2p_port = 8333,
            log_filters = config.log_filters,
            index_batch_size = index_batch_size,
            index_lookup_limit = index_lookup_limit,
        )?;
    }

    Ok(())
}
