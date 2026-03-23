/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Force GitHub Sync 2
 */

import { useState, useEffect } from 'react';
import { Check, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { StartButton } from './components/StartButton';
import { PAINT_COLORS } from './constants/colors';
import { COLOR_DATA } from './constants/colorData';

const backgroundImage = 'https://ais-pre-f7uzmfkteogpslyxxxzlqe-44940172969.asia-northeast1.run.app/background.jpg';
const logoImage = 'https://ais-pre-f7uzmfkteogpslyxxxzlqe-44940172969.asia-northeast1.run.app/logo.png';

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [tempColor, setTempColor] = useState<string | null>(null);

  useEffect(() => {
    if (step === 9) {
      const timer = setTimeout(() => {
        setStep(10);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    if (step === 3 || step === 5 || step === 7) {
      if (tempColor) {
        setSelectedColors([...selectedColors, tempColor]);
        setTempColor(null);
        setStep(step + 1);
      }
    } else if (step < 14) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 4 || step === 6 || step === 8) {
      const newColors = [...selectedColors];
      newColors.pop();
      setSelectedColors(newColors);
      setStep(step - 1);
    } else if (step === 10) {
      setStep(8);
    } else if (step > 1 && step !== 9) {
      setTempColor(null);
      setStep(step - 1);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedColors([]);
    setTempColor(null);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div 
        className="w-full max-w-md h-[100dvh] relative overflow-hidden flex items-center justify-center"
      >
        {/* Content Layer */}
        <div 
          className={`relative z-10 flex flex-col rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden ${
            step === 1 ? 'w-[85%] h-[85%] bg-white/75 backdrop-blur-sm' : 'w-[90%] h-[90%] bg-white/85 backdrop-blur-sm'
          }`}
        >
          {/* Step 1: Start */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-center h-full p-6 gap-8">
              <div className="flex flex-col items-center gap-8 -translate-y-[85px]">
                {/* Logo Placeholder */}
                <img 
                  src={logoImage} 
                  alt="Logo" 
                  className="w-[130px] h-[130px] object-contain translate-y-[42px]" 
                  onError={(e) => e.currentTarget.style.display = 'none'} 
                />
                <h1 className="text-[85px] font-['East_Sea_Dokdo'] text-center leading-none drop-shadow-lg text-gray-800">마음에<br/>색을 심다.</h1>
              </div>
              <div className="h-32 w-full flex items-center justify-center">
                <StartButton onClick={() => setStep(2)} className="scale-[0.325] origin-center drop-shadow-xl" />
              </div>
            </div>
          )}

        {/* Step 2, 4, 6: Explanation */}
        {[2, 4, 6].includes(step) && (
          <div className="flex flex-col h-full p-6">
            <h2 className="text-[65px] font-['East_Sea_Dokdo'] text-center mt-0 text-gray-800">
              {step === 2 ? '1' : step === 4 ? '2' : '3'}단계
            </h2>
            <div className="flex-1 flex flex-col items-center justify-center text-center font-['East_Sea_Dokdo'] text-4xl leading-[1.1] -translate-y-9">
              <div className="text-gray-600 mb-2">12가지 컬러 중</div>
              <div className="text-gray-600 leading-[1.1]">
                {step !== 2 && (
                  <span className="text-gray-600">선택했던 컬러는 제외,<br/></span>
                )}
                <span className="text-black underline decoration-2 underline-offset-4">
                  {step === 2 ? '가장 눈에 띄는 컬러' : step === 4 ? '두 번째로 눈에 띄는 컬러' : '세 번째로 눈에 띄는 컬러'}
                </span>
                를<br/>1가지 선택해주세요.
              </div>
            </div>
            <div className="flex justify-between w-full mt-auto pb-4 px-4 shrink-0">
              <button onClick={handlePrev} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowLeft size={28}/></button>
              <button onClick={handleNext} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowRight size={28}/></button>
            </div>
          </div>
        )}

        {/* Step 3, 5, 7: Selection */}
        {[3, 5, 7].includes(step) && (
          <div className="flex flex-col h-full p-6">
            <h2 className="text-4xl font-['East_Sea_Dokdo'] text-center mt-2 mb-6 leading-snug">
              {step === 3 ? '1' : step === 5 ? '2' : '3'}단계 컬러 선택
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-auto px-1">
              {PAINT_COLORS.map(color => {
                const isAlreadySelected = selectedColors.includes(color);
                const isCurrentSelection = tempColor === color;
                return (
                  <div
                    key={color}
                    onClick={() => !isAlreadySelected && setTempColor(color)}
                    className={`aspect-square w-full rounded-xl cursor-pointer relative shadow-sm transition-all ${isAlreadySelected ? 'opacity-20' : 'hover:scale-105'} ${isCurrentSelection ? 'ring-4 ring-gray-800 ring-offset-2 scale-105' : ''}`}
                    style={{ backgroundColor: color }}
                  >
                    {(isAlreadySelected || isCurrentSelection) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="text-white w-10 h-10 drop-shadow-md" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between w-full mt-auto pb-4 px-4 shrink-0">
              <button onClick={handlePrev} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowLeft size={28}/></button>
              <button onClick={handleNext} disabled={!tempColor} className="p-3 bg-gray-100 rounded-full disabled:opacity-30 active:scale-95 transition-transform"><ArrowRight size={28}/></button>
            </div>
          </div>
        )}

        {/* Step 8: Mid-check */}
        {step === 8 && (
          <div className="flex flex-col h-full p-6 items-center">
            <div className="text-center mt-3 mb-8 flex flex-col items-center">
              <h2 className="text-[60px] whitespace-nowrap font-['East_Sea_Dokdo'] leading-none text-gray-800 tracking-[-1px]">
                TODAY'<span className="text-[48px]">S</span> PICK!
              </h2>
              <div className="text-5xl font-['East_Sea_Dokdo'] text-gray-600 leading-none tracking-[-1px]">3colors</div>
            </div>
            <div className="flex gap-2.5 mb-10">
              {selectedColors.map((color, i) => (
                <div key={i} className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="flex flex-col items-center text-center font-['Nanum_Gothic'] leading-relaxed w-full mb-auto text-gray-800 text-[17px]">
              <div>무심코 고른 세 가지 색상,</div>
              <div className="whitespace-nowrap tracking-tight">사실 여기에는 특별한 의미가 숨어 있답니다.</div>
              <div className="h-6"></div>
              <div>컬러가 들려주는 내 마음의 이야기를</div>
              <div>알고 싶다면 다음을 눌러 주세요.</div>
            </div>
            <div className="flex justify-between w-full mt-auto pb-4 px-4 shrink-0">
              <button onClick={handlePrev} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowLeft size={28}/></button>
              <button onClick={handleNext} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowRight size={28}/></button>
            </div>
          </div>
        )}

        {/* Step 9: Loading */}
        {step === 9 && (
          <div className="flex flex-col h-full items-center justify-center">
            <h2 className="text-4xl font-['Russo_One'] mb-12 tracking-widest text-gray-800 drop-shadow-md">LOADING...</h2>
            <div className="flex gap-4">
              {[0,1,2].map(i => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-md"
                  style={{ backgroundColor: selectedColors[i] }}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90, 180] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 10, 11, 12: Detail */}
        {step >= 10 && step <= 12 && (
          <div className="flex flex-col h-full px-2 py-5 items-center">
            <div className="text-center mt-2 mb-4 flex flex-col items-center">
              <h2 className="text-[55px] whitespace-nowrap font-['East_Sea_Dokdo'] leading-none text-gray-800 tracking-[-1px]">
                COLOR STORY
              </h2>
            </div>
            
            <div className="text-center font-['Nanum_Gothic'] text-[15px] leading-relaxed text-gray-800 mb-3 whitespace-pre-line tracking-tighter break-keep w-full h-[122px]">
              {step === 10 && "첫 번째로 선택한 컬러는\n나의 '본 모습'을 의미합니다.\n내가 세상을 대하는 태도와\n타고난 기질을 보여줍니다."}
              {step === 11 && "두 번째로 선택한 컬러는\n'현재 나의 감정'을 의미합니다.\n최근 내 마음이 어떤 감정인지\n내면의 상태를 보여줍니다."}
              {step === 12 && "세 번째로 선택한 컬러는\n'내가 바라는 방향'을 의미합니다.\n위로나 용기가 필요할 때\n내 마음이 무의식적으로\n찾고 있는 에너지를 보여줍니다."}
            </div>

            <div className="w-14 h-14 rounded-xl shadow-md mb-3 shrink-0" style={{ backgroundColor: selectedColors[step - 10] }} />
            
            <div className="bg-[#F5F0E6] px-2 py-5 rounded-2xl w-full text-center shadow-sm mb-auto flex items-center justify-center">
              <p className="font-['Nanum_Gothic'] text-[15.5px] text-gray-800 leading-relaxed break-keep tracking-tight">
                {step === 10 && COLOR_DATA[selectedColors[0]]?.desc1}
                {step === 11 && COLOR_DATA[selectedColors[1]]?.desc2}
                {step === 12 && COLOR_DATA[selectedColors[2]]?.desc3}
              </p>
            </div>

            <div className={`flex w-full mt-auto pb-5 px-8 shrink-0 ${step === 10 ? 'justify-end' : 'justify-between'}`}>
              {step > 10 && (
                <button onClick={handlePrev} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowLeft size={28}/></button>
              )}
              <button onClick={handleNext} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowRight size={28}/></button>
            </div>
          </div>
        )}

        {/* Step 13: Summary */}
        {step === 13 && (
          <div className="flex flex-col h-full px-2 py-5 items-center">
            <div className="text-center mt-2 mb-4 flex flex-col items-center">
              <h2 className="text-[55px] whitespace-nowrap font-['East_Sea_Dokdo'] leading-none text-gray-800 tracking-[-1px]">
                COLOR STORY
              </h2>
              <div className="text-5xl font-['East_Sea_Dokdo'] text-gray-600 leading-none tracking-[-1px] -mt-3">summary</div>
            </div>

            <div className="bg-[#F5F0E6] px-4 py-8 rounded-2xl w-full text-center shadow-sm mb-auto flex flex-col items-center justify-center gap-6 mt-4">
              <p className="font-['Nanum_Gothic'] text-[15.5px] text-gray-800 leading-relaxed break-keep tracking-tight">
                원래 <span className="inline-block w-4 h-4 rounded-full align-middle mx-0.5 shadow-sm" style={{ backgroundColor: selectedColors[0] }} /> <span>{COLOR_DATA[selectedColors[0]]?.summary1}</span>이신데,
              </p>
              <p className="font-['Nanum_Gothic'] text-[15.5px] text-gray-800 leading-relaxed break-keep tracking-tight">
                최근 <span className="inline-block w-4 h-4 rounded-full align-middle mx-0.5 shadow-sm" style={{ backgroundColor: selectedColors[1] }} /> <span>{COLOR_DATA[selectedColors[1]]?.summary2}</span>을 겪고 계셔서,
              </p>
              <p className="font-['Nanum_Gothic'] text-[15.5px] text-gray-800 leading-relaxed break-keep tracking-tight">
                지금은 <span className="inline-block w-4 h-4 rounded-full align-middle mx-0.5 shadow-sm" style={{ backgroundColor: selectedColors[2] }} /> <span>{COLOR_DATA[selectedColors[2]]?.summary3}</span> 가장 필요하신 것 같아요.
              </p>
            </div>

            <div className="flex justify-between w-full mt-auto pb-5 px-8 shrink-0">
              <button onClick={handlePrev} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowLeft size={28}/></button>
              <button onClick={handleNext} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowRight size={28}/></button>
            </div>
          </div>
        )}

        {/* Step 14: Final */}
        {step === 14 && (
          <div className="flex flex-col h-full px-1 py-5 items-center text-center">
            <h2 className="text-[33px] font-['East_Sea_Dokdo'] mt-10 mb-6 leading-[1.1] tracking-tight">
              이제,<br/>
              당신만의 캔버스를 채울 시간입니다.
            </h2>
            
            <div className="flex flex-row justify-center gap-4 mb-6 shrink-0">
              {selectedColors.map((color, idx) => {
                const colorNumber = COLOR_DATA[color]?.number || '';
                return (
                  <div 
                    key={idx} 
                    className="w-12 h-12 rounded-xl shadow-sm flex items-center justify-center text-white font-bold text-lg" 
                    style={{ backgroundColor: color, textShadow: '0px 1px 3px rgba(0,0,0,0.6)' }}
                  >
                    {colorNumber}
                  </div>
                );
              })}
            </div>
            
            <div className="font-['Nanum_Gothic'] leading-relaxed mb-auto text-gray-700 text-[16px]">
              이 세가지 색상은<br/>
              당신의 과거, 현재 그리고 미래를 담은<br/>
              세상에 단 하나뿐인 팔레트 입니다.<br/><br/>
              정해진 형태나 규칙은 없습니다.<br/><br/>
              마음이 이끄는 대로,<br/>
              당신의 COLOR STORY를 캔버스 위에<br/>
              자유롭게 펼쳐보세요
            </div>
            
            <div className="flex justify-between w-full mt-auto pb-5 px-8 shrink-0">
              <button onClick={handlePrev} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><ArrowLeft size={28}/></button>
              <button onClick={reset} className="p-3 bg-gray-100 rounded-full active:scale-95 transition-transform"><RotateCcw size={28}/></button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
