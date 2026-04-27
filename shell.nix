{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
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
  ];
}
