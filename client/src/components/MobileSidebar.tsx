import { Transition } from "@headlessui/react";

// import { setOpenSidebar } from "../redux/authSlice";
import { Fragment, useRef } from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useAccountStore } from "../redux/store";
const MobileSidebar = () => {
    const { isSidebarOpen } = useAccountStore((state) => state.account);
    const mobileMenuRef = useRef(null);
 
  
    const closeSidebar = () => {
      // dispatch(setOpenSidebar(false));
    };
  
    return (
      <>
        <Transition
          show={isSidebarOpen}
          as={Fragment}
          enter='transition-opacity duration-700'
          enterFrom='opacity-x-10'
          enterTo='opacity-x-100'
          leave='transition-opacity duration-700'
          leaveFrom='opacity-x-100'
          leaveTo='opacity-x-0'
        >
          {(ref) => (
            <div
              ref={(node) => (mobileMenuRef.current = node)}
              className={clsx(
                "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
              )}
              onClick={() => closeSidebar()}
            >
              <div className='bg-white w-3/4 h-full'>
                <div className='w-full flex justify-end px-5 mt-5'>
                  <button
                    onClick={() => closeSidebar()}
                    className='flex justify-end items-end'
                  >
                    <IoClose size={25} />
                  </button>
                </div>
  
                <div className='-mt-10'>
                  <Sidebar />
                </div>
              </div>
            </div>
          )}
        </Transition>
      </>
    );
  };

  export default MobileSidebar;