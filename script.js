// script.js
document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const connectWallet = document.getElementById('connect-wallet');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Theme functionality - Add this new section
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Initialize theme
    initTheme();
    themeToggleBtn?.addEventListener('click', toggleTheme);

    // Your existing terminal functionality
    terminalInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && terminalInput.value.trim() !== '') {
            addTerminalLine('you>', terminalInput.value);
            
            setTimeout(() => {
                addTerminalLine('firecat>', 'Processing your request... 🔥');
            }, 500);
            
            terminalInput.value = '';
        }
    });

    function addTerminalLine(prompt, text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt">${prompt}</span> ${text}`;
        
        const inputLine = document.getElementById('input-line');
        terminalBody.insertBefore(line, inputLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Load gallery images
    const tableDiv = document.getElementById('table');
    if (tableDiv) {
        loadGallery();
    }

    function loadGallery() {
        // Array of image IDs mapped to their ordinal numbers [number, inscriptionId]
        const images = [
            [1, '4998b6d77c5e58b10acf8eda686ff452bbca6ea63e51ff251df9bf77e30b9188i0'],
            [2, '6843dc1c5b3a87d46d47e3e7b35fa03e68f1a9e86112514c5c7a30e76cb59065i0'],
            [3, '69af6b5de9d0e070a81ec2c2e3ac71432efa3d9e0a0c401e629c177f57fb3a33i0'],
            [4, 'f9e5c3102c0589be13f86df6d07c712d07f0b9f6f87100ca06b8b6eb39d26a4fi0'],
            [5, 'ce87eb002edbcde6700ddbcdd77eca735287431215517524307efd2980997f3fi0'],
            [6, 'f9bc237e30dd14e1889affa3728458e795cc0b632279a35dc46a55e7a59eb13fi0'],
            [7, 'f3690b7750aceb0fa9a0bb61366682e974b2529d26947b7bb0926f0dffca5be7i0'],
            [8, '5628acebcc6bcdf1fc2c170e63da34bb0f5929d4897807b6630996ce0d3403cai0'],
            [9, 'a39b33fecc5bd7084dabdfa418966b1dbb0d5f7bc33370ab7143c6166ba55afbi0'],
            [10, '28e1587ac98f38b92250f88f714f7d2c2e507ea7f496a271aca8da06f783eaa4i0'],
            [11, '9c4e956f9b24fb5c51d6a98f62c5f4c661857abc5cc3747529e1244000c9466ei0'],
            [12, 'aac036a2444c74d9a4d8dfaec38fc8625f78236c046ce79333dcf9f257f850cfi0'],
            [13, '26d04eb461333e4a90eb514dcdd6175c6c662c0141779ca39476e0856f07793ci0'],
            [14, '7f2f237a37e97d1f99434baffade845b37a17320e18ed64661d353fa5c3e2a1ai0'],
            [15, '5ac5dac5c144200ff90e9090a8d79e5386cddc3fd0b71df0ce216e823faec71di0'],
            [16, '1218b70cc6828f2965ff336ac88b0fc4508347ac5096fbb4ac51c863a1885a9ei0'],
            [17, '89c59da276aea73e41086f873e194a81d6599e58cac35354cbd9a26df2c92e0bi0'],
            [18, '2c79ca118439e6f768e81829f27fee5ebeeb619ec350820c73642c1d13803c03i0'],
            [19, 'b5c897274362bb968d8ab30b53d77a3ec0b2337057a7dc4367ef650dba3407e1i0'],
            [20, '66f9844db8bb4283a31a482f82f201159b14ee3bbada4822425f479903d18683i0'],
            [21, '9e64bea3e76787e5a059a53ef1ec921dac6535e1cfc69dc5f9f9489a01fdda74i0'],
            [22, 'cb73763dbe0cafacec29e1fea02058f9301ad8cf5094d0b69c081942de9029e2i0'],
            [23, '19cac60b298fc0ddb966b3c94b46cdb598658738d4f589ce04a9503f259cfe71i0'],
            [24, 'ac7fe3c7db68d508d624b7983e8ed224958cf0534bebf49edbe17f5254b4735fi0'],
            [25, 'd06f930f5bdedae5acab8908a895c2e6640075c552bba5c9b9aabcc35ca3a54ei0'],
            [26, '9717df6541d639d09e7671e50cc4d5d9da886a5e8e762f3b5be60abad6f0deb2i0'],
            [27, '733d58ee435fa21fba9138d74d30ec59f15bcf7e1244ae8bcc3f14282fd6514ci0'],
            [28, '754de08cba7419c5dbc5d631427fb26b7607eb037d7d0ea5dd1b58a7c836021ci0'],
            [29, '275fa8d8116549f06bd5ae87d3566ade141cf4f7b05322fbb19d19f8c7aebb71i0'],
            [30, '461759e8e04132823d3cf65d3233f3d2a3049743ceedd8dd20960d384f6d327bi0'],
            [31, 'ba5f635ca94d29cd186593e490e2a257b836b5641891a3af6466b59746d0c5fei0'],
            [32, 'e08ca50b216b5ffc3bcd59abc042745cb39d4b6adfdfcb637cd683d439b42ccdi0'],
            [33, 'b16eceae56072e2213ad53bc7ff1c93ac175129dced602d07600c7df8860617bi0'],
            [34, '9efb9b01f0b476c5ee6a0ed5ea8909d2e3dec66112849c15170dc3c1be88a3d8i0'],
            [35, '155bded1a53f20475d82e69c154f139071ce3f7a4e8cd91c4afa837712b7852bi0'],
            [36, '90b2e0e6cbdfb2803618268a8bd0505f4a63a1717f32b42a6d9619ffcd82a7cfi0'],
            [37, '84789c111d429a3fb48d32338103487d2fa89a3e4766da725959c23461b192a3i0'],
            [38, 'a2853fe082215a12c1639e50fbc4e7899f0a62009f8b61aebf48a02ab95392b8i0'],
            [39, '7445422b97f05612f84da6ca5e549778451d7e6bf39ba50a9b6a392d710a79f8i0'],
            [40, '01e1bcdf8851d841cb40ec4e25579f819dea552a236af8133e36ab3601c468bei0'],
            [41, '1df185ce798c02da86898d584ba5c3e9f306cd01eba61201bc9c7a0ed295f923i0'],
            [42, '20b3f551701730cf8746346145fe50d810cb8f60a16c70f9df0b7337372e3cf9i0'],
            [43, '6661393796c21f5ab95cfbf01128bcdf564f79de9f6f1c674cadd7c917190960i0'],
            [44, 'bc0cc77edab50ce8f84d21fc2d3a291397278b0be18fcee7e082b2f40193b220i0'],
            [45, '9c2e16a6d0d542241bbd54d43e08ab91a35bd6703bda4ea59702982814a2c641i0'],
            [46, '78d35ef2a5323a48b3131a0f0d5c639c4244bc8a020a0e13244c221f430ad8b0i0'],
            [47, '6c23332faec69a24ba31d3f3cb5a7b48374833f8a47135c2a862a16ea4e95913i0'],
            [48, 'f013c927ae930eac3331e8e44399e59e5384a7a014924fafe996c27c7bf422b8i0'],
            [49, 'c9ca22121f12f79efe53b627410bd8fd1f67b0308c63cb569078fbf6e45baceei0'],
            [50, '6549a96f148e08b94206e1079dc1cf23fc598ae50d191952969f1f0240c8210bi0'],
            [51, 'aa937f118c0238607cfac998cdf8cdd6004d1d92caf7e9192be76d12e6c005c8i0'],
            [52, '890a9ae36aa0d8df46cac4a3f228e40c235aae2217113830380d15356555d92ci0'],
            [53, '12d252726bd70b218855c7e0c0f0df99bcb063183e4b390c39cd3d58025e8b24i0'],
            [54, 'efb15b18830e1fa54d6f57e64933e3b318872b0256d67b5287037efffa18961fi0'],
            [55, 'f7d6f78d1cfca18108a423b8566117f6ff29bac50c424f9fc674023bd95defa4i0'],
            [56, 'c1f62aaf73b4d4ff07f0c3983aeb0bb2d4bd6be458e5f37f339d6a920a6549d1i0'],
            [57, '8457dfdfe81d1b52f7fb97e7f8866fc653f43939dd72cf1f52d1d14c610f1856i0'],
            [58, '958380b0427677c680584a08484ddff3c758b88475be8123c5f4858205663aeai0'],
            [59, '7e9e59fd52854f28c025b8233f97f8c436bf6d2bed8443d0b39a106ab454ac45i0'],
            [60, '6e540bfdccdf9c77c111412f0807372546600c2d0d6dafe62ca3b971618e6e30i0'],
            [61, 'b8c4c95e6328a7841dda17bd4c6a571c58b00d26a542b3cc09702ff414c387e0i0'],
            [62, '15b03ca88071855a64d8400991c3539006448d50e40b37ed660402e29a970197i0'],
            [63, '33d4b2ab4922339c5ad76c1762bf94d8354a5c87fc0e4fe3c274f5e3b9341321i0'],
            [64, 'ef6c60c9bbb78d258c9a8e90321cb4a12b051f859d56703d4717edcc586ce125i0'],
            [65, '6095b459d11c2682830d91dcf6231286cbdb17a45155d8ca40f9ec558686b4abi0'],
            [66, 'a5f9c81b95e57610867706d2334160b1d26d7a764e4020560ebaec4705e7ff14i0'],
            [67, '4a42a4ed57ad286e55a8fd9dad436c55a421cf803278d548702b6f88e47135aei0'],
            [68, 'dff58b9fc621990532cfb0369b77fe60dd6e944796b47d28423880472bb53344i0'],
            [69, '4a30e014607ac3041e2370eaf6c8551f82178a299c31d3132c8126b9ecff3b85i0'],
            [70, 'a8120a023be3239e791e1ebd339040fdbd46ffc1afa95cfd0b43610c2b11a589i0'],
            [71, '8a3146455c2c580b70a1bc91d2a7488367099c92d1f74d4a0c880a49e4312fe7i0'],
            [72, '4de48284e7e8032d9e89ef698fadd3a699e0ae312f3f2fb591340cedba80d3d8i0'],
            [73, 'cc0563e2b4df98ec8d8720227c6327f7268246e6a50ce05396f9daebff236b28i0'],
            [74, '4155bff75edd792f84546a337e9337f5ffeb581a58e25bd341397a1397d7b52bi0'],
            [75, '28054c5c3d675a5ccf4fddf1c4bed4a30f6a75293a6cc8252489f9738a0128f8i0'],
            [76, '037b4ff30b32511ec349bd5c9b4dcdeb3b556ad3228941d0fc53ae3a3a48cc1bi0'],
            [77, '1075b942926a8fa2e8b1e0c8670ae8055324a106399ce817c050c2328c7dcb7ci0'],
            [78, 'cf2cc8c125b1b15b17349b17186e8c641dabfb1413f34b87facf987fa090b33bi0'],
            [79, 'a8d75dab3d3dcdebb657dc68a2a0aee2db9b2ab488a25a674cf4d7ebc36cc6fei0'],
            [80, '344b7dddc00a324d4c1006e983370f584f2e4cc8699f8bfe31396d1f81568707i0'],
            [81, '546033c6adc1a8cadfb0868a14be347a75e3cbc828cd9c6f2894adae73d91d2ci0'],
            [82, 'c2e068e9714e112aecafc693b8e95cf28acec156ce7b14218a4858a183a010f8i0'],
            [83, 'a0deae4fb29cba0f56e77734c304d94fa1f3582c156d0f6a04749100129bab07i0'],
            [84, 'efb56be60af9ac45a4ed818a0684fbea9c44ecacd1237b002899ce61b5c9119bi0'],
            [85, '4d56b3762aaf326e7c7ebe84dd2e8b445d2936783c174aa64a5496fad874e510i0'],
            [86, '94786eb9ebebc9eb46340a1c59a8bf10a5b544fb25f97bca6d9216e4518525e8i0'],
            [87, '85ff18e7d8d80d34dc39aed6a19fc17a7b82e90e3287ca9e021c6ecba78fd6dci0'],
            [88, '7fc43b82db95d86ad2bcb715fddfdeb97070ddfffb88968ae2f7eb04ff08c222i0'],
            [89, 'a49caab966edb522f4fb508f7de3d4e9c576d0c1f7a1cd77a20a5f19f1b8657fi0'],
            [90, 'aa56b9fff1ab562b10f8c541c913a619cc32dea50c3478a7792e36fbc6fd2296i0'],
            [91, '7c5611de340860a1ee0e1d8e91424af9e8e450f02e845b239d0b4903ad4ac9b8i0'],
            [92, 'd10a5eda1953cb6fc8bea803846013a6bb935d31ef6af590bed4232b06cb3a5ei0'],
            [93, '7bb60486a03943e54010967309af196eb12ce504c224aeca2a68339a89b5f9dfi0'],
            [94, '43f68fc5989699f137cab43a5ed33d63554adb4db7deb124698d2f06bc16441fi0'],
            [95, '42a08658dc9be0759f1c8687a8f821f5306f9adab3dbe4499f2d92be6918d4f6i0'],
            [96, '83002d0f74260eab44be361b06168514b0ff3a03d6a5093ba5a1669595dec170i0'],
            [97, '169b2f1fe043ffdc8496d27b7fa63d690a38ffb0f89f585e1dcccead40683e8di0'],
            [98, '6dc49000dd1c2f9562aa310d06aa02f99b9f7e55b0390b4669d640cd2283a12ci0'],
            [99, 'c0451582c3685678052974c6a96e585072003c323c61f5c4a7f74d203910866bi0'],
            [100, '4d338e0451c22530acc9ab4fd85e1135e4920206039e0eb7ea80867e28d05060i0']
        ];

        let currentRow;
    images.forEach(([number, imageId], index) => {
        if (index % 5 === 0) {
            currentRow = document.createElement('div');
            currentRow.className = 'row';
            tableDiv.appendChild(currentRow);
        }

        const link = document.createElement('a');
        link.href = `https://ordinals.com/inscription/${imageId}`;
        link.target = '_blank';

        const img = document.createElement('img');
        // Update the path to handle spaces in filename
        img.src = `./images/firecat%20%23${number}.png`; // URL encode the space and #
        img.alt = `Firecat #${number}`;
        img.style.cursor = 'pointer';
        
        link.appendChild(img);
        currentRow.appendChild(link);

        // Add error handling for images
        img.onerror = () => {
            console.error(`Failed to load image: firecat #${number}.png`);
            img.src = 'https://via.placeholder.com/200'; // Fallback image
        };
    });
}

    // Section toggling functionality
    function toggleSection(sectionId) {
        const sections = ['about', 'terminal', 'table', 'contact'];
        
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                if (id === sectionId) {
                    if (section.classList.contains('textblock-hide')) {
                        section.classList.remove('textblock-hide');
                        section.classList.add('textblock-show');
                        // Smooth scroll to section
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                        section.classList.add('textblock-hide');
                        section.classList.remove('textblock-show');
                    }
                } else {
                    section.classList.add('textblock-hide');
                    section.classList.remove('textblock-show');
                }
            }
        });
    }

    // Add click handlers to nav buttons
    document.querySelectorAll('.header-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.textContent.toLowerCase();
            toggleSection(section === 'ai terminal' ? 'terminal' : section === 'gallery' ? 'table' : section);
        });
    });

    // Wallet connection
    connectWallet?.addEventListener('click', () => {
        addTerminalLine('system>', 'Connecting wallet...');
        // Add your wallet connection logic here
    });

    // Focus terminal input when clicking terminal
    document.querySelector('.terminal-body')?.addEventListener('click', () => {
        terminalInput?.focus();
    });

    // Initial setup
    terminalInput?.focus();
});