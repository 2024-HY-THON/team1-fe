import React, {useEffect, useState} from 'react';
import "./Shop.css"

function Shop() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [treeInfo, setTreeInfo] = useState({
        level: null,
        wear: null,
        name: '',
        exp: null,
    });
    const categories = [
        {id: 1, level: 1},
        {id: 2, level: 1},
        {id: 3, level: 1},
        {id: 4, level: 1},
        {id: 5, level: 1},
        {id: 6, level: 1},
        {id: 7, level: 1},
        {id: 8, level: 1},
        {id: 9, level: 1},
        {id: 10, level: 1},
        {id: 11, level: 1},
        {id: 12, level: 1},
        {id: 13, level: 1},
    ];

    useEffect(() => {
        const fetchTreeInfo = async () => {
            try {
                const token = localStorage.getItem('token' || "");
                const response = await fetch('http://localhost:8080/tree/info', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    console.log('Failed to fetch tree info');
                }

                const data = await response.json();
                setTreeInfo(data);
            } catch (error) {
                console.error('Error fetching tree info:', error);
            }
        };

        fetchTreeInfo();
    }, []);

    useEffect(() => {
        if (treeInfo.wear !== null) {
            const fetchWear = async () => {
                try {
                    const token = localStorage.getItem('token' || "");
                    const response = await fetch(`http://localhost:8080/wear/${treeInfo.wear}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        console.log(`HTTP error! status: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error fetching wear:', error);
                }
            };

            fetchWear();
        }
    }, [treeInfo.wear]);

    return (
        <div className={"main"}>
            <div className={"container"}>
                <div className={"banner-container"}>
                    <div className={"banner"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
                            <path d="M9 1L1 9L9 17" stroke="#ACCD5E" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <p className={"banner-text"}>나무샵</p>
                    </div>
                </div>
                <div className={"banner-underline"}/>
                <div className={"shop-container"}>
                    <div className={"shop-contents-wrapper"}>
                        <div className={"shop-image-container"}>
                            <img className={"shop-top-image"} src={`/lv${treeInfo.level}/${treeInfo.wear}.png`}
                                 alt={"null"}></img>
                        </div>
                        <div className={"shop-contents-container"}>
                            <div className={"shop-product-container-wrapper"}>

                                <div className={"shop-category-container"}>
                                    <div className={"shop-category-area"}>
                                        <button
                                            className={`shop-category ${activeCategory === 0 ? "active" : "inactive"}`}
                                            onClick={() => setActiveCategory(0)}>
                                            <div className={"shop-category-image-wrapper"}>
                                                <div className={"shop-category-image"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                         viewBox="0 0 17 17" fill="none">
                                                        <path
                                                            d="M13.6694 6.67336L14.0117 6.72067C15.9712 6.99239 17.291 6.35432 16.9447 5.30287C16.5982 4.25199 16.5982 2.53131 16.9447 1.48043C17.2913 0.428976 15.9712 -0.20909 14.0117 0.0626264L12.4429 0.28051C11.3339 0.434076 10.3422 0.950026 9.68802 1.62889C9.52085 1.16961 9.17037 1.48213 8.50028 1.48213C7.8302 1.48213 7.47943 1.16933 7.31227 1.62889C6.65833 0.950026 5.66638 0.434076 4.5577 0.28051L2.98888 0.0626264C1.02907 -0.20909 -0.290983 0.428976 0.05525 1.48043C0.402333 2.53131 0.402333 4.25199 0.05525 5.30287C-0.291267 6.35432 1.02907 6.99239 2.98888 6.72067L3.33087 6.67336C2.86308 8.51445 1.91703 10.7361 0 12.4667H3.68333V17C3.68333 17 6.84108 12.5137 7.42673 5.39666C7.62223 5.56552 7.95572 5.35926 8.50028 5.35926C9.04457 5.35926 9.37805 5.56524 9.57355 5.39666C10.1592 12.5137 13.3167 17 13.3167 17V12.4667H17C15.083 10.7361 14.1369 8.51445 13.6694 6.67336ZM4.48035 5.99166L2.91153 6.20954C2.63727 6.24751 2.37207 6.26677 2.12245 6.26677C1.25432 6.26677 0.77265 6.04181 0.611717 5.83157C0.558167 5.76216 0.381083 5.60576 0.534933 5.45871C2.35677 3.71649 7.11705 4.58009 7.11705 4.58009C6.56483 5.27879 5.57827 5.83951 4.48035 5.99166ZM12.5202 5.99166C11.4223 5.83951 10.4357 5.27851 9.88323 4.58009C9.88323 4.58009 14.6441 3.71621 16.4651 5.45871C16.6195 5.60604 16.4418 5.76216 16.3886 5.83157C16.2276 6.04181 15.746 6.26677 14.8778 6.26677C14.6282 6.26677 14.3627 6.24751 14.0887 6.20954L12.5202 5.99166Z"
                                                            fill={`${activeCategory === 0 ? "#ACCD5E" : "white"}`}/>
                                                    </svg>
                                                </div>
                                            </div>

                                        </button>
                                        <button
                                            className={`shop-category ${activeCategory === 1 ? "active" : "inactive"}`}
                                            onClick={() => setActiveCategory(1)}>
                                            <div className={"shop-category-image-wrapper"}>
                                                <div className={"shop-category-image"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                                                         viewBox="0 0 21 21" fill="none">
                                                        <path
                                                            d="M2.625 11.375C2.625 13.4636 3.45468 15.4666 4.93153 16.9435C6.40838 18.4203 8.41142 19.25 10.5 19.25C10.5 17.1614 9.67031 15.1584 8.19347 13.6815C6.71662 12.2047 4.71358 11.375 2.625 11.375ZM10.5 19.25C12.5886 19.25 14.5916 18.4203 16.0685 16.9435C17.5453 15.4666 18.375 13.4636 18.375 11.375C16.2864 11.375 14.2834 12.2047 12.8065 13.6815C11.3297 15.1584 10.5 17.1614 10.5 19.25ZM15.75 2.625V7C15.75 8.39239 15.1969 9.72774 14.2123 10.7123C13.2277 11.6969 11.8924 12.25 10.5 12.25C9.10761 12.25 7.77226 11.6969 6.78769 10.7123C5.80312 9.72774 5.25 8.39239 5.25 7V2.625C5.8975 2.625 6.53625 2.73 7.14 2.96625C7.62125 3.1675 8.05 3.465 8.40875 3.84125L10.5 1.75L12.5913 3.84125C12.95 3.465 13.3787 3.1675 13.86 2.96625C14.4631 2.73528 15.1042 2.61953 15.75 2.625Z"
                                                            fill={`${activeCategory === 1 ? "#ACCD5E" : "white"}`}/>
                                                    </svg>
                                                </div>
                                            </div>

                                        </button>
                                        <button
                                            className={`shop-category ${activeCategory === 2 ? "active" : "inactive"}`}
                                            onClick={() => setActiveCategory(2)}>
                                            <div className={"shop-category-image-wrapper"}>
                                                <div className={"shop-category-image"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17"
                                                         viewBox="0 0 20 17" fill="none">
                                                        <path
                                                            d="M16.5004 3.47C15.7605 4.2 15.5705 5.25 15.9204 6.15L13.0008 9.07V7C13.0008 6.45 12.5508 6 12.0009 6H10.971C11.001 5.83 11.001 5.67 11.001 5.5C11.001 2.46 8.54123 2.41872e-06 5.50156 2.41872e-06C4.36888 -0.00105997 3.26352 0.347883 2.3367 0.999099C1.40988 1.65032 0.706868 2.572 0.323825 3.63807C-0.0592183 4.70414 -0.103583 5.86253 0.196801 6.95478C0.497184 8.04703 1.12765 9.01979 2.00194 9.74V16C2.00194 16.55 2.45189 17 3.00183 17H12.0009C12.5508 17 13.0008 16.55 13.0008 16V11.89L17.3303 7.56C18.2302 7.91 19.2801 7.73 20 7L16.5004 3.47ZM2.05193 6C2.03194 5.83 2.00194 5.67 2.00194 5.5C2.00194 3.57 3.57177 2 5.50156 2C7.43135 2 9.00119 3.57 9.00119 5.5C9.00119 5.67 8.97119 5.83 8.95119 6H2.05193Z"
                                                            fill={`${activeCategory === 2 ? "#ACCD5E" : "white"}`}/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="shop-product-container">
                                    <div className="shop-product-scroll-wrapper">
                                        <div className="shop-product-contents-wrapper">
                                            {categories.map((item, index) => {
                                                if (activeCategory === 0 && index % 2 === 0 && index < 6) {
                                                    const nextItem = categories[index + 1];
                                                    return (
                                                        <div className="shop-product-group" key={item.id}>
                                                            <button className="shop-product-contents"
                                                                    onClick={() => {
                                                                        setTreeInfo(prevTreeInfo => ({
                                                                            ...prevTreeInfo,  // 기존 상태 유지
                                                                            wear: item.id,    // wear 값을 item.id로 업데이트
                                                                        }));
                                                                    }}>
                                                                <div className="shop-product-inner">
                                                                    <img src={`/icon/${item.id}.png`}
                                                                         alt={item.content}/>
                                                                </div>
                                                            </button>
                                                            {nextItem && nextItem.id !== item.id && (
                                                                <button className="shop-product-contents"
                                                                        onClick={() => {
                                                                            setTreeInfo(prevTreeInfo => ({
                                                                                ...prevTreeInfo,  // 기존 상태 유지
                                                                                wear: nextItem.id,    // wear 값을
                                                                                                      // item.id로 업데이트
                                                                            }));
                                                                        }}>
                                                                    <div className="shop-product-inner">
                                                                        <img src={`/icon/${nextItem.id}.png`}
                                                                             alt={nextItem.content}/>
                                                                    </div>
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                }

                                                if (activeCategory === 1 && index >= 6 && index <= 10 && index % 2 === 0) {
                                                    const nextItem = categories[index + 1];
                                                    return (
                                                        <div className="shop-product-group" key={item.id}>
                                                            <button className="shop-product-contents"
                                                                    onClick={() => {
                                                                        setTreeInfo(prevTreeInfo => ({
                                                                            ...prevTreeInfo,  // 기존 상태 유지
                                                                            wear: item.id,    // wear 값을 item.id로 업데이트
                                                                        }));
                                                                    }}>
                                                                <div className="shop-product-inner">
                                                                    <img src={`/icon/${item.id}.png`}
                                                                         alt={item.content}/>
                                                                </div>
                                                            </button>
                                                            {nextItem && nextItem.id !== item.id && nextItem.id !== 12 && (
                                                                <button className="shop-product-contents"
                                                                        onClick={() => {
                                                                            setTreeInfo(prevTreeInfo => ({
                                                                                ...prevTreeInfo,  // 기존 상태 유지
                                                                                wear: nextItem.id,    // wear 값을
                                                                                                      // item.id로 업데이트
                                                                            }));
                                                                        }}>
                                                                    <div className="shop-product-inner">
                                                                        <img src={`/icon/${nextItem.id}.png`}
                                                                             alt={nextItem.content}/>
                                                                    </div>
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                                if (activeCategory === 2 && index >= 11 && index % 2 === 1) {
                                                    const nextItem = categories[index + 1];
                                                    return (
                                                        <div className="shop-product-group" key={item.id}>
                                                            <button className="shop-product-contents2" onClick={() => {
                                                                setTreeInfo(prevTreeInfo => ({
                                                                    ...prevTreeInfo,  // 기존 상태 유지
                                                                    wear: item.id,    // wear 값을 item.id로 업데이트
                                                                }));
                                                            }}>
                                                                <div className="shop-product-inner2">
                                                                    <img src={`/icon/${item.id}.png`}
                                                                         alt={item.content}/>
                                                                </div>
                                                            </button>
                                                            {nextItem && nextItem.id !== item.id && nextItem.id !== 12 && (
                                                                <button className="shop-product-contents2"
                                                                        onClick={() => {
                                                                            setTreeInfo(prevTreeInfo => ({
                                                                                ...prevTreeInfo,  // 기존 상태 유지
                                                                                wear: nextItem.id,    // wear 값을
                                                                                                      // item.id로 업데이트
                                                                            }));
                                                                        }}>
                                                                    <div className="shop-product-inner2">
                                                                        <img src={`/icon/${nextItem.id}.png`}
                                                                             alt={nextItem.content}/>
                                                                    </div>
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                }

                                                return null;  // 해당 조건에 맞지 않으면 렌더링하지 않음
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}

export default Shop;
