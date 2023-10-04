import {Fragment} from "react";

export default function Header() {
    return (<Fragment>
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-3 bg-zinc-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <span
                            className="self-center text-xl font-roboto whitespace-nowrap text-white">Credentials system</span>
                    </a>
                </div>
            </nav>
        </header>
    </Fragment>)
}