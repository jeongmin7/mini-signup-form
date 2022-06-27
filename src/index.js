// TODO: 이 곳에 정답 코드를 작성해주세요.
// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. autofocus
// 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
//대상: id 입력 input
//시점: window가 로드되었을때
//이벤트:focus()
// const $id = document.getElementById('id')
// console.log($id)
// window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사 로직
//대상: ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.
//이벤트: Input focus out// 가입하기버튼 클릭
//핸들러: input 유효성 검사 //모든 필드의 유효성 검사

// 1.  autofocus 구현
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사 로직 구현
const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')

const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

// 3. 커스텀 에러 메시지
const checkRegex = (target) => {
    const { value, id } = target // destructuring 구조분해할당
    // const value = target.value; const id = target.id
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? true : 'invalidId'
            case 'pw':
                return PW_REGEX.test(value) ? true : 'invalidPw'
            case 'pw-check':
                return value === $pw.value ? true : 'invalidPwCheck'
        }
    }
}

const checkValidation = (target, msgTarget) => {
    const isValid = checkRegex(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MSG[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
    return isValid
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))

$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))

$pwCheck.addEventListener('focusout', () =>
    checkValidation($pwCheck, $pwCheckMsg)
)

// 4. 입력 확인 모달 창
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        checkValidation($id, $idMsg) === true &&
        checkValidation($pw, $pwMsg) === true &&
        checkValidation($pwCheck, $pwCheck) === true

    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

$cancelBtn.addEventListener('click', () => {
    $modal.close()
})

$approveBtn.addEventListener('click', () => {
    window.alert('가입되었습니다 🥳 ')
    $modal.close()
})
// 5. 폰트 사이즈 조절 버튼
// 회원가입 폼에 사용된 기본 폰트 사이즈는 16px입니다.

// 기본 폰트 사이즈를 기준으로 1px씩 폰트 사이즈를 조절할 수 있는 기능을 구현해주세요.

// (최소: 12px, 최대: 20px)

// 현재 폰트 사이즈가 20px일 경우 + 버튼 비활성화
// 현재 폰트 사이즈가 12px일 경우 - 버튼 비활성화
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')
const $html = document.documentElement
const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}
$increaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('increase')
    // const currentFontSize = getHtmlFontSize()
    // $html.style.fontSize = currentFontSize + 1
    // //20px이상이면 increasebtn 비활성화
    // if (currentFontSize + 1 >= MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = true
    // } else {
    //     $decreaseFontBtn.disabled = false
    // }
})
$decreaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('decrease')
    // const currentFontSize = getHtmlFontSize()
    // $html.style.fontSize = currentFontSize - 1
    // if (currentFontSize - 1 < MIN_FONT_SIZE) {
    //     $decreaseFontBtn.disabled = true
    // } else {
    //     $increaseFontBtn.disabled = false
    // }
})

const onClickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()
    // let newFontSize
    // if (flag === 'increase') {
    //     newFontSize = fontSize + 1
    // } else {
    //     newFontSize = fontSize - 1
    // }
    //     $html.style.fontSize = newFontSize
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize
    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE

    // $html.style.fontSize = currentFontSize + 1
    // //20px이상이면 increasebtn 비활성화
    // if (currentFontSize + 1 >= MAX_FONT_SIZE) {
    //     $increaseFontBtn.disabled = true
    // } else {
    //     $decreaseFontBtn.disabled = false
    // }
}
