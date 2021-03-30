import React from "react";

export function Options() {
    return (
        <div className="mt-3">
            <label className="text-gray-700 text-sm" htmlFor="count">
                Color:
            </label>
            <div className="flex items-center mt-1">
                <button className="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                <button className="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                <button className="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
            </div>
        </div>
    );
}

export default Options;
