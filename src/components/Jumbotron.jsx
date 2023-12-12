import iPhone from '../assets/images/iphone-14.jpg';
import holdingIphone from '../assets/images/iphone-hand.png'
import React from 'react'

const Jumbotron = () => {
    const learnMore = () => {
        const element = document.querySelector('.sound-section');
        window.scrollTo({
            top: element?.getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className='jumbotron-section wrapper'>

            <h2 className='title'>New</h2>
            <img className='image' src={iPhone} alt='image' />
            <p className='text'>Big and Bigger</p>
            <span className='description'>For $41.62/mo. for 24 mo. or $999 before trade-in</span>
            <ul className='links'>
                <li>
                    <button className='button'>Buy</button>
                </li>
                <li>
                    <a className='link' onClick={learnMore}>Learn More</a>
                </li>
            </ul>
            <img className='iphone-img' src={holdingIphone} alt='holding-iphone' />

        </div>
    )
}

export default Jumbotron