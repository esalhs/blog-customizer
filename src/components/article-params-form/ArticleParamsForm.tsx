import { useRef, useEffect, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsProps = {
	initialSettings: ArticleStateType;
	defaultSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialSettings,
	defaultSettings,
	onApply,
}: ArticleParamsProps) => {
	const [isSidebarOpen, setOpen] = useState<boolean>(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(initialSettings);

	const asideRef = useRef<HTMLElement | null>(null);
	const arrowRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setFormSettings(initialSettings);
	}, [initialSettings]);

	useEffect(() => {
		if (!isSidebarOpen) {
			return;
		}

		function handleClickOutside(e: MouseEvent) {
			if (
				asideRef.current &&
				!asideRef.current.contains(e.target as Node) &&
				arrowRef.current &&
				!arrowRef.current.contains(e.target as Node)
			) {
				onClose();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen, onClose]);

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

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onApply(formSettings);
	}
	function handleReset(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onApply(defaultSettings);
	}

	return (
		<>
			<ArrowButton ref={arrowRef} isOpen={isSidebarOpen} onClick={onToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formSettings.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(option) => {
							changeSettings('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(option) => {
							changeSettings('fontSizeOption', option);
						}}
					/>
					<Select
						selected={formSettings.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(option) => {
							changeSettings('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						selected={formSettings.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(option) => {
							changeSettings('backgroundColor', option);
						}}
					/>
					<Select
						selected={formSettings.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(option) => {
							changeSettings('contentWidth', option);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
