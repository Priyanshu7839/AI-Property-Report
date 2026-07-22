import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Building2, Search, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import {toast} from 'sonner'
import axios from 'axios'
import {UploadToFirebase} from '../../apicalls/ApiCalls'
import { useNavigate } from 'react-router';

export interface PropertyOnboardData {
  address: string;
  city: string;
  postcode: string;
  country: string;
  unit?: string;
  building?: string;
  propertyType: string;
}

type Step = 'address' | 'details' | 'confirm';

const PROPERTY_TYPES = ['Apartment', 'House', 'Studio', 'Penthouse', 'Commercial Unit'];

const MOCK_SUGGESTIONS = [
  { address: 'Hoofdstraat 45', city: 'Amsterdam', postcode: '1012 AB', country: 'Netherlands' },
  { address: 'Prinsengracht 112', city: 'Amsterdam', postcode: '1015 EA', country: 'Netherlands' },
  { address: 'Keizersgracht 78', city: 'Amsterdam', postcode: '1017 EV', country: 'Netherlands' },
  { address: 'Herengracht 200', city: 'Amsterdam', postcode: '1016 BT', country: 'Netherlands' },
  { address: 'Vondelstraat 33', city: 'Amsterdam', postcode: '1054 GD', country: 'Netherlands' },
];

export function AddPropertyModal({ openproperty, setopenProperty, onAdd }) {
  const [step, setStep] = useState<Step>('address');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof MOCK_SUGGESTIONS>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<typeof MOCK_SUGGESTIONS[0] | null>(null);
  const [manual, setManual] = useState({ address: '', city: '', postcode: '', country: 'Netherlands' });
  const [isManual, setIsManual] = useState(true);
  const [unit, setUnit] = useState('');
  const [building, setBuilding] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [adding, setAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  

  useEffect(() => {
    if (openproperty) {
      setStep('address');
      setQuery('');
      setSuggestions([]);
      setSelected(null);
      setManual({ address: '', city: '', postcode: '', country: 'Netherlands' });
      setIsManual(true);
      setUnit('');
      setBuilding('');
      setPropertyType('Apartment');
      setAdding(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [openproperty]);

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return; }
    setSearching(true);
    const t = setTimeout(() => {
      setSuggestions(MOCK_SUGGESTIONS.filter(s =>
        s.address.toLowerCase().includes(query.toLowerCase()) ||
        s.city.toLowerCase().includes(query.toLowerCase()) ||
        s.postcode.toLowerCase().includes(query.toLowerCase())
      ));
      setSearching(false);
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const activeAddress = isManual ? manual : selected;
  const canProceedAddress = isManual
    ? manual.address.trim() && manual.city.trim() && manual.postcode.trim()
    : !!selected;

  function handleConfirm() {
    if (!activeAddress) return;
    setAdding(true);
    setTimeout(() => {
      onAdd({
        address: activeAddress.address,
        city: activeAddress.city,
        postcode: activeAddress.postcode,
        country: activeAddress.country,
        unit: unit || undefined,
        building: building || undefined,
        propertyType,
      });
      setAdding(false);
     setopenProperty(false)
    }, 800);
  }

 

  
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async()=>{
   setLoading(true)


    if(manual.address===''){
     
   toast.error('Please enter an Address')
    setLoading(false)

      return;
    }
    else{
    

        try {
          const response = await axios.get(`https://zhomes-realty-us.p.rapidapi.com/properties/search-address?address=${manual.address}`,{
            headers:{
            'X-RapidAPI-Key': 'd3cfd720b6msh644a12c2e9f2d08p186288jsn9c9392aa203b',
            'X-RapidAPI-Host': 'zhomes-realty-us.p.rapidapi.com'
          }
          })

          console.log(response)
          

          // if(response.data.data?.zestimate === null) {
          // setDataError(true)
          // return;
          // }

          if(response.data.message==='Successful'){
            const data= response?.data
            UploadToFirebase(manual.address,true)
        navigate(`/Report?address=${manual.address}`,{

          
          state:{data}
        });
            
          }

        } catch (error) {
          console.log(error)
          
          if(error.response.data.errors.address==='The input is not a detailed address'){
           
            navigate('/add')
            setManual(...manual,{address:''})
          
              UploadToFirebase(manual.address,false)

          }
        }
    }

    setLoading(false)
  }

   if (!openproperty) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add Property"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={()=>{setopenProperty(false)}}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-[15px] leading-tight text-gray-900" style={{ fontWeight: 600 }}>Add Property</h2>
              <p className="text-xs text-gray-400 mt-0.5">Onboard a new property to your portfolio</p>
            </div>
          </div>
          <button
            onClick={()=>{setopenProperty(false)}}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 px-6 py-3 bg-gray-50 border-b border-gray-100">
          {(['address', 'details', 'confirm'] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                  step === s ? 'bg-black text-white' :
                  (['address', 'details', 'confirm'].indexOf(step) > i) ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-400'
                }`} style={{ fontWeight: 600 }}>
                  {(['address', 'details', 'confirm'].indexOf(step) > i) ? '✓' : i + 1}
                </div>
                <span className={`text-xs ${step === s ? 'text-gray-900' : 'text-gray-400'}`} style={{ fontWeight: step === s ? 600 : 400 }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
              </div>
              {i < 2 && <div className="flex-1 h-px bg-gray-200 mx-2" />}
            </React.Fragment>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* Step 1: Address */}
          {step === 'address' && (
            <div className="space-y-4">
          

              
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Address *</label>
                      <input
                        ref={inputRef}
                        type="text"
                        value={manual.address}
                        onChange={e => setManual(m => ({ ...m, address: e.target.value }))}
                        placeholder="e.g. Hoofdstraat 45"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-black"
                      />
                    </div>
                    {/* <div>
                      <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Postcode *</label>
                      <input
                        type="text"
                        value={manual.postcode}
                        onChange={e => setManual(m => ({ ...m, postcode: e.target.value }))}
                        placeholder="1012 AB"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>City *</label>
                      <input
                        type="text"
                        value={manual.city}
                        onChange={e => setManual(m => ({ ...m, city: e.target.value }))}
                        placeholder="Amsterdam"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-black"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Country</label>
                      <select
                        value={manual.country}
                        onChange={e => setManual(m => ({ ...m, country: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-black bg-white"
                      >
                        <option>Netherlands</option>
                        <option>Belgium</option>
                        <option>Germany</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                      </select>
                    </div> */}
                  </div>
                  {/* <button
                    onClick={() => { setIsManual(false); setManual({ address: '', city: '', postcode: '', country: 'Netherlands' }); }}
                    className="text-xs text-black hover:underline"
                  >
                    ← Back to address search
                  </button> */}
                </div>
              
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && activeAddress && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                <MapPin className="h-4 w-4 text-black mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-900">{activeAddress.address}</div>
                  <div className="text-xs text-gray-400">{activeAddress.postcode} · {activeAddress.city} · {activeAddress.country}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Unit / Flat no.</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    placeholder="e.g. Apt 3B"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Building label</label>
                  <input
                    type="text"
                    value={building}
                    onChange={e => setBuilding(e.target.value)}
                    placeholder="e.g. Building A"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Property type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PROPERTY_TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => setPropertyType(t)}
                        className={`px-3 py-2 rounded-xl text-xs border transition-all ${propertyType === t ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        style={{ fontWeight: propertyType === t ? 600 : 400 }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 'confirm' && activeAddress && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Review the details before adding this property to your portfolio.</p>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                {[
                  { label: 'Address', value: activeAddress.address },
                  { label: 'City', value: activeAddress.city },
                  { label: 'Postcode', value: activeAddress.postcode },
                  { label: 'Country', value: activeAddress.country },
                  ...(unit ? [{ label: 'Unit', value: unit }] : []),
                  ...(building ? [{ label: 'Building', value: building }] : []),
                  { label: 'Type', value: propertyType },
                ].map((row, i) => (
                  <div key={row.label} className={`flex justify-between items-center px-4 py-2.5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <span className="text-xs text-gray-400">{row.label}</span>
                    <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => {
              if (step === 'details') setStep('address');
              else if (step === 'confirm') setStep('details');
              else{
                setopenProperty(false)
              };
            }}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {step === 'address' ? 'Cancel' : '← Back'}
          </button>

          {step !== 'confirm' ? (
            <Button
              className="bg-black hover:bg-gray-900 text-white rounded-xl px-5"
           
             onClick={()=>{handleSubmit()}}
            >
              {loading?'Processing...':'Continue'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-black hover:bg-gray-900 text-white rounded-xl px-5"
              onClick={handleConfirm}
              disabled={adding}
            >
              {adding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding…
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Add Property
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
