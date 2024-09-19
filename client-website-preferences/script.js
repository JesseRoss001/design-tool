// script.js

// Define all questions (Removed layoutStyle and navigationStyle)
const questions = [
    {
        id: 1,
        question: "1. Choose Your Primary Color",
        name: "primaryColor",
        type: "color",
    },
    {
        id: 2,
        question: "2. Choose Your Secondary Color",
        name: "secondaryColor",
        type: "color",
    },
    {
        id: 3,
        question: "3. Choose Your Accent Color",
        name: "accentColor",
        type: "color",
    },
    {
        id: 4,
        question: "4. Select Heading Font",
        name: "headingFont",
        type: "radio",
        options: [
            { label: "Roboto", value: "'Roboto', sans-serif" },
            { label: "Open Sans", value: "'Open Sans', sans-serif" },
            { label: "Lato", value: "'Lato', sans-serif" },
            { label: "Montserrat", value: "'Montserrat', sans-serif" },
            { label: "Playfair Display", value: "'Playfair Display', serif" },
            { label: "Raleway", value: "'Raleway', sans-serif" },
            { label: "Arial", value: "'Arial', sans-serif" },
            { label: "Times New Roman", value: "'Times New Roman', serif" },
        ]
    },
    {
        id: 5,
        question: "5. Select Body Font",
        name: "bodyFont",
        type: "radio",
        options: [
            { label: "Roboto", value: "'Roboto', sans-serif" },
            { label: "Open Sans", value: "'Open Sans', sans-serif" },
            { label: "Lato", value: "'Lato', sans-serif" },
            { label: "Montserrat", value: "'Montserrat', sans-serif" },
            { label: "Playfair Display", value: "'Playfair Display', serif" },
            { label: "Raleway", value: "'Raleway', sans-serif" },
            { label: "Arial", value: "'Arial', sans-serif" },
            { label: "Times New Roman", value: "'Times New Roman', serif" },
        ]
    },
    {
        id: 6,
        question: "6. Choose Animation Effects",
        name: "animationEffect",
        type: "radio",
        options: [
            { label: "None", value: "none" },
            { label: "Fade In", value: "fade-in" },
            { label: "Slide In", value: "slide-in" },
            { label: "Bounce", value: "bounce" },
        ]
    },
    {
        id: 7,
        question: "7. Choose Button Style",
        name: "buttonStyle",
        type: "radio",
        options: [
            { label: "Default", value: "default" },
            { label: "Rounded", value: "rounded" },
            { label: "Outline", value: "outline" },
        ]
    },
    {
        id: 8,
        question: "8. Choose Footer Content",
        name: "footerContent",
        type: "radio",
        options: [
            { label: "Include Social Media Icons", value: "include-icons" },
            { label: "Do Not Include Social Media Icons", value: "exclude-icons" },
        ]
    },
    {
        id: 9,
        question: "9. Include Icons Throughout Website?",
        name: "includeIcons",
        type: "radio",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ]
    },
    {
        id: 10,
        question: "10. How Spaced Out Should the Content Be?",
        name: "spacing",
        type: "radio",
        options: [
            { label: "Tight", value: "tight" },
            { label: "Normal", value: "normal" },
            { label: "Loose", value: "loose" },
        ]
    },
    {
        id: 11,
        question: "11. How Important is Website Speed?",
        name: "websiteSpeed",
        type: "radio",
        options: [
            { label: "Very Important", value: "very-important" },
            { label: "Somewhat Important", value: "somewhat-important" },
            { label: "Not Important", value: "not-important" },
        ],
        info: "More images and animations may slow down your website."
    },
];

// Initialize state
let currentQuestion = 0;
const answers = {};

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const livePreview = document.getElementById('livePreview');
const footer = document.getElementById('footer');
const iconSection = document.querySelector('.icon-section');
const socialMediaSection = document.querySelector('.social-media');

// Function to render a question
function renderQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    if (question.type === 'radio') {
        question.options.forEach(option => {
            const div = document.createElement('div');
            div.classList.add('form-check');

            const input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = 'radio';
            input.name = question.name;
            input.value = option.value;
            input.id = `${question.name}-${option.value}`;

            // Check if previously answered
            if (answers[question.name] === option.value) {
                input.checked = true;
            }

            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.setAttribute('for', `${question.name}-${option.value}`);
            label.textContent = option.label;

            // Apply font family to label if it's a font selection
            if (question.name === 'headingFont' || question.name === 'bodyFont') {
                label.style.fontFamily = option.value;
            }

            div.appendChild(input);
            div.appendChild(label);
            optionsContainer.appendChild(div);
        });
    } else if (question.type === 'color') {
        // For color selectors (primary, secondary, accent)
        const div = document.createElement('div');
        div.classList.add('mb-3');

        const label = document.createElement('label');
        label.setAttribute('for', question.name);
        label.classList.add('form-label');
        label.textContent = `Choose ${formatLabel(question.name)}:`;

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.classList.add('form-control', 'form-control-color');
        colorInput.name = question.name;
        colorInput.id = question.name;
        colorInput.value = answers[question.name] || getDefaultColor(question.name);
        colorInput.title = "Choose your color";

        colorInput.addEventListener('input', (e) => {
            answers[question.name] = e.target.value;
            applyStyles();
        });

        div.appendChild(label);
        div.appendChild(colorInput);
        optionsContainer.appendChild(div);
    }

    // Display additional info if available
    if (question.info) {
        const info = document.createElement('p');
        info.classList.add('info-text');
        info.textContent = question.info;
        optionsContainer.appendChild(info);
    }

    // Update buttons
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === questions.length - 1 ? 'Finish' : 'Next';
}

// Helper function to format label names
function formatLabel(name) {
    switch (name) {
        case 'primaryColor':
            return 'Primary Color';
        case 'secondaryColor':
            return 'Secondary Color';
        case 'accentColor':
            return 'Accent Color';
        default:
            return name.charAt(0).toUpperCase() + name.slice(1);
    }
}

// Helper function to get default colors
function getDefaultColor(name) {
    switch (name) {
        case 'primaryColor':
            return '#007BFF';
        case 'secondaryColor':
            return '#6C757D';
        case 'accentColor':
            return '#28A745';
        default:
            return '#000000';
    }
}

// Function to apply styles based on answers
function applyStyles() {
    // Primary, Secondary, Accent Colors
    if (answers.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', answers.primaryColor);
        // Update navbar background
        const navbar = livePreview.querySelector('.navbar');
        if (navbar) {
            navbar.style.backgroundColor = answers.primaryColor;
        }
        // Update h1 color
        const h1 = livePreview.querySelector('h1');
        if (h1) {
            h1.style.color = answers.primaryColor;
        }
    }
    if (answers.secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', answers.secondaryColor);
        // Update footer background
        footer.style.backgroundColor = answers.secondaryColor;
        // Update h2 color
        const h2 = livePreview.querySelector('h2');
        if (h2) {
            h2.style.color = answers.secondaryColor;
        }
    }
    if (answers.accentColor) {
        document.documentElement.style.setProperty('--accent-color', answers.accentColor);
        // Update button colors if not outline
        const buttons = livePreview.querySelectorAll('.preview-button');
        buttons.forEach(button => {
            if (button.classList.contains('outline')) {
                // Outline buttons already use accent color
                button.style.border = `2px solid ${answers.accentColor}`;
                button.style.color = answers.accentColor;
            } else {
                button.style.backgroundColor = answers.accentColor;
                button.style.color = '#fff';
            }
        });
        // Update icon colors
        const icons = livePreview.querySelectorAll('.preview-icon');
        icons.forEach(icon => {
            icon.style.color = answers.accentColor;
        });
    }

    // Typography
    if (answers.headingFont) {
        document.documentElement.style.setProperty('--heading-font', answers.headingFont);
        const headings = livePreview.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
            heading.style.fontFamily = answers.headingFont;
        });
    }
    if (answers.bodyFont) {
        document.documentElement.style.setProperty('--body-font', answers.bodyFont);
        const paragraphs = livePreview.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.fontFamily = answers.bodyFont;
        });
    }

    // Animation Effects
    livePreview.classList.remove('none', 'fade-in', 'slide-in', 'bounce');
    if (answers.animationEffect) {
        livePreview.classList.add(answers.animationEffect);
    }

    // Button Style
    const livePreviewButtons = livePreview.querySelectorAll('.preview-button');
    livePreviewButtons.forEach(button => {
        button.classList.remove('default', 'rounded', 'outline');
        if (answers.buttonStyle) {
            button.classList.add(answers.buttonStyle);
            switch (answers.buttonStyle) {
                case 'default':
                    button.style.borderRadius = '5px';
                    button.style.backgroundColor = answers.accentColor || '#28A745';
                    button.style.border = 'none';
                    button.style.color = '#fff';
                    break;
                case 'rounded':
                    button.style.borderRadius = '20px';
                    button.style.backgroundColor = answers.accentColor || '#28A745';
                    button.style.border = 'none';
                    button.style.color = '#fff';
                    break;
                case 'outline':
                    button.style.borderRadius = '5px';
                    button.style.backgroundColor = 'transparent';
                    button.style.border = `2px solid ${answers.accentColor || '#28A745'}`;
                    button.style.color = answers.accentColor || '#28A745';
                    break;
                default:
                    button.style.borderRadius = '5px';
                    button.style.backgroundColor = answers.accentColor || '#28A745';
                    button.style.border = 'none';
                    button.style.color = '#fff';
            }
        }
    });

    // Footer Content
    footer.classList.remove('include-icons', 'exclude-icons');
    if (answers.footerContent === 'include-icons') {
        footer.classList.add('include-icons');
    } else {
        footer.classList.add('exclude-icons');
    }

    // Include Icons Throughout Website
    if (answers.includeIcons === 'yes') {
        iconSection.classList.remove('d-none');
    } else {
        iconSection.classList.add('d-none');
    }

    // Spacing
    livePreview.classList.remove('spacing-tight', 'spacing-normal', 'spacing-loose');
    if (answers.spacing) {
        livePreview.classList.add(`spacing-${answers.spacing}`);
    }

    // Social Media Icons
    if (answers.footerContent === 'include-icons') {
        socialMediaSection.classList.remove('d-none');
    } else {
        socialMediaSection.classList.add('d-none');
    }

    // Website Speed (Optional: Can be expanded based on further requirements)
}

// Event Listeners for Navigation Buttons
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
    }
});

nextBtn.addEventListener('click', () => {
    const current = questions[currentQuestion];
    let selectedValue;

    if (current.type === 'radio') {
        const selectedOption = document.querySelector(`input[name="${current.name}"]:checked`);
        if (selectedOption) {
            selectedValue = selectedOption.value;
        } else {
            alert('Please select an option to proceed.');
            return;
        }
    } else if (current.type === 'color') {
        const colorInput = document.querySelector(`input[name="${current.name}"]`);
        selectedValue = colorInput.value;
    }

    // Save the answer
    answers[current.name] = selectedValue;
    applyStyles();

    // Move to next question or finish
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    } else {
        alert('Preferences saved! Thank you.');
        // Disable the questionnaire and display a thank you message
        document.querySelector('.questionnaire').innerHTML = '<h2>Thank you for your preferences!</h2>';
    }
});

// Initialize first question on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion(currentQuestion);
});
