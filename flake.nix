{
  inputs = {
    nixpkgs.url = "github:/nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
      };

    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages =  with pkgs; [
              pkg-config

              rustc
              pnpm
              cargo

              glib
              gdk-pixbuf
              atk
              atkmm
              pango
              libsoup_3
              gtk3
              webkitgtk_4_1
              # gio

              # cpp deps
              cmake
              ninja
              gcc
              gtest
        ];
      };
    };
}
