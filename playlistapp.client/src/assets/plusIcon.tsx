import React from 'react'

type IconProps = {
    width: string,
    height: string,
  }
  

export const PlusIcon: React.FC<IconProps> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 416 416" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M208 0C179.833 0 157 22.8335 157 51V157H51C22.8335 157 0 179.833 0 208C0 236.167 22.8335 259 51 259H157V365C157 393.167 179.833 416 208 416C236.167 416 259 393.167 259 365V259H365C393.167 259 416 236.167 416 208C416 179.833 393.167 157 365 157H259V51C259 22.8335 236.167 0 208 0Z" fill="black" />
            </svg>
        </>

    )
}
