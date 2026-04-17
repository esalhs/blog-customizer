import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setOpen] = useState<boolean>(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	function onToggle() {
		setOpen((prev) => !prev);
	}
	function onClose() {
		setOpen(false);
	}

	function changeSettings(key: keyof ArticleStateType, value: OptionType) {
		setFormSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	}
	function applySettings() {
		setAppliedSettings(formSettings);
	}
	function resetSettings() {
		setAppliedSettings(defaultArticleState);
		setFormSettings(defaultArticleState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={onToggle}
				onClose={onClose}
				formSettings={formSettings}
				changeSettings={changeSettings}
				applySettings={applySettings}
				resetSettings={resetSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
