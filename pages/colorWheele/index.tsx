import React, { useState, useEffect } from "react";
import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import ColorWheel from "./../components/colorWheel";

export default function customizeBoard(): JSX.Element {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-5">
                <ColorWheel />
            </div>
            <Footer />
        </div>
    );
}